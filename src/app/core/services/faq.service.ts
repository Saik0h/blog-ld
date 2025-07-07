import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { faq, faqPayload, Message } from '../utils/types';
import { catchError, EMPTY, finalize, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.apiUrl + '/faq';
  private _isLoading = signal<boolean>(false);
  public isLoading = this._isLoading.asReadonly;
  private handleError = inject(ErrorService).handleHTTPError;
  private _hasError = signal<boolean>(false);
  public hasError = this._hasError.asReadonly;

  getAllFaqs = (): Observable<faq[]> => {
    this._isLoading.set(true);
    const obs = this.http.get<faq[]>(this.url).pipe(
      catchError((err: HttpErrorResponse) => {
        this.handleError(err);
        this._hasError.set(true);
        return EMPTY;
      }),
      finalize(() => {
        this._isLoading.set(false);
      })
    );

    return obs;
  };

  postFaq = (data: faqPayload): Observable<Message> => {
    return this.http.post<Message>(this.url, data, { withCredentials: true });
  };

  getOneFaq = (id: number): Observable<faq> => {
    const obs = this.http.get<faq>(`${this.url}/${id}`).pipe(
      catchError((err: HttpErrorResponse) => {
        this.handleError(err);
        this._hasError.set(true);
        return EMPTY;
      }),
      finalize(() => {
        this._isLoading.set(false);
      })
    );

    return obs;
  };

  deleteFaq = (id: number): Observable<Message> => {
    return this.http.delete<Message>(`${this.url}/${id}`, {
      withCredentials: true,
    });
  };
}
