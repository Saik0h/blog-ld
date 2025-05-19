import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing: boolean = false;
  private http = inject(HttpClient);
  intercept = (
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> => {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 401 && !this.isRefreshing) {
          this.isRefreshing = true;
          
          return this.http
          .post<{ accessToken: string }>(
            'http://localhost:3000/api/auth/refresh',
            {},
            { withCredentials: true }
          )
          .pipe(
            switchMap(() => {
              this.isRefreshing = false;
              return next.handle(req);
            }),
            catchError((err) => {
              this.isRefreshing = false;
              return throwError(() => err);
            })
            );
          }
        return throwError(() => error);
      })
    );
  };
}


export const authInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};