import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

let isRefreshing = false;

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService: AuthService = inject(AuthService);
  const router = inject(Router);
  return next(req).pipe(
    catchError((error) => {
      console.log(error)
      if (error.status === 401 && !isRefreshing) {
        isRefreshing = true;

        return authService.refresh().pipe(
          switchMap(() => {
            isRefreshing = false;
            authService.isAuthenticated.set(true)
            return next(req);
          }),
          catchError((err) => {
            isRefreshing = false;
            authService.isAuthenticated.set(false)
            router.navigate(['auth/login']);
            return throwError(() => err);
          })
        );
      }

      return throwError(() => error);
    })
  );
};

export const authInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useValue: authInterceptor,
  multi: true,
};
