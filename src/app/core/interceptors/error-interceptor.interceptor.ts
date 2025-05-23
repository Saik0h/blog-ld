// src/app/interceptors/error.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpErrorResponse, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Erro desconhecido.';

      if (error.error?.message) {
        message = error.error.message;
      }
      if (error.status === 0) {
        message = 'Não foi possível conectar ao servidor.';
      }
      if (error.status === 401) {

        message = ' ';
      }
      if (error.status === 403) {
        message = 'Você não tem permissão para isso.';
      }
      if (error.status === 404) {
        message = 'Recurso não encontrado.';
      }

      toastr.error(message, `Erro ${error.status}`);
      return throwError(() => error);
    })
  );
};