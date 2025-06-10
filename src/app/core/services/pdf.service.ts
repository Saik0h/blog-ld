import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private baseUrl = 'https://laisdonida-be.onrender.com/api/pdf';

  private http = inject(HttpClient);

  uploadPdf(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http
      .post<{ url: string }>(`${this.baseUrl}/upload`, formData)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Upload error:', error);
    return throwError(() => new Error('Failed to upload PDF.'));
  }
}
