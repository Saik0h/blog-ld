import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  toastr = inject(ToastrService);

  showMessage = (error: HttpErrorResponse) => {
    let errMsg = this.singleErrorToString(error);
    this.toastr.error(errMsg, `Erro ${error.status}`);
  };

  singleErrorToString = (err: HttpErrorResponse) => {
    return typeof err.error.message === 'string'
      ? err.error.message
      : err.error.message[0];
  };
}
