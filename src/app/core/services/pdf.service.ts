import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, EMPTY, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ErrorService } from './error.service';
export type publicUrl = {
  publicUrl: string
}
@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private baseUrl = environment.apiUrl + '/pdf';

  private http = inject(HttpClient);
  private _isLoading = signal<boolean>(false);
  public isLoading = this._isLoading.asReadonly;
  private handleError = inject(ErrorService).handleHTTPError;
  
  uploadPdf(file: File): Observable<{url: string}> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http
      .post<{url: string}>(`${this.baseUrl}/upload`, formData)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.handleError(err);
          return EMPTY;
        })
      );
  }
}
