import {
  HttpClient,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

// Global flag to prevent multiple simultaneous refreshes
let isRefreshing = false;

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const http = inject(HttpClient);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401 && !isRefreshing) {
        isRefreshing = true;

        return http
          .post('http://localhost:3000/api/auth/refresh', {}, { withCredentials: true })
          .pipe(
            switchMap(() => {
              isRefreshing = false;
              // Retry the original request
              return next(req);
            }),
            catchError((err) => {
              isRefreshing = false;
              return throwError(() => err);
            })
          );
      }

      return throwError(() => error);
    })
  );
};

// 👇 Correct way to provide it
export const authInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useValue: authInterceptor,
  multi: true,
};