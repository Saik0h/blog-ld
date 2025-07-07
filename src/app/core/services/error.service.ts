import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  toastr = inject(ToastrService);

ERROR_MESSAGES: { [key: number]: string } = {
  401: 'Apenas usuários autenticados podem acessar este recurso.',
  403: 'Você não tem permissão para acessar este recurso.',
  404: 'Recurso não encontrado.',
  500: 'Erro interno do servidor. Tente novamente mais tarde.',
};

handleHTTPError = (error: HttpErrorResponse) => {

  let errMsg = 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
  if (error.error instanceof ErrorEvent) {
    errMsg = `Erro: ${error.error.message}`;
  } else if (error.status) {
    errMsg =
      this.ERROR_MESSAGES[error.status] || `Erro desconhecido: ${error.status}`;
  } else if (error.message) {
    errMsg = error.message;
  }
  this.toastr.error(errMsg, `Erro ${error.status}`);
}

}
