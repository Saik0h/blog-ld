import {
  HttpClient,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

let isRefreshing = false;

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const http = inject(HttpClient);
  const router = inject(Router);
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401 && !isRefreshing) {
        isRefreshing = true;

        return http
          .post(
            'http://localhost:3000/api/auth/refresh',
            {},
            { withCredentials: true }
          )
          .pipe(
            switchMap(() => {
              isRefreshing = false;
              return next(req);
            }),
            catchError((err) => {
              isRefreshing = false;
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
