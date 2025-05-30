import {
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';


export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
 
  const authService: AuthService = inject(AuthService);
  const router = inject(Router);

  const request = next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      console.log(err)
      if (err.status === 401) {
        authService.refresh().pipe(
          switchMap(() => {
            return next(req)
          }),
          catchError((err) => {
            router.navigate(['auth/login']);
            return throwError(() => err)
          })
        )
      }
      return throwError(() => err)
    })
  )
  return request
};

