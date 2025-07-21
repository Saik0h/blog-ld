import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
export type publicUrl = {
  publicUrl: string;
};
@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private baseUrl = environment.apiUrl + '/pdf';

  private http = inject(HttpClient);
  private _isLoading = signal<boolean>(false);
  public isLoading = this._isLoading.asReadonly;

  uploadPdf(file: File): Observable<{ url: string }> {
    this._isLoading.set(true);
    const formData = new FormData();
    formData.append('file', file);
    return this.http
      .post<{ url: string }>(`${this.baseUrl}/upload`, formData)
      .pipe(finalize(() => this._isLoading.set(false)));
  }
}
