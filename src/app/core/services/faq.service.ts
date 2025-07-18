import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { faq, faqDisplay, faqPayload, Message } from '../utils/types';
import { catchError, EMPTY, finalize, map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  private readonly url = environment.apiUrl + '/faq';

  private readonly http = inject(HttpClient);
  private handleError = inject(ErrorService).handleHTTPError;

  private _hasError = signal<boolean>(false);
  private _isLoading = signal<boolean>(false);

  public faqs = signal<faqDisplay[]>([]);
  public isLoading = this._isLoading.asReadonly();
  public hasError = this._hasError.asReadonly();

  private handleHttpError = (err: HttpErrorResponse) => {
    this.handleError(err);
    this._hasError.set(true);
    return EMPTY;
  };

  getAllFaqs = (): void => {
    this._isLoading.set(true);

    const obs = this.http
      .get<faqDisplay[]>(this.url)
      .pipe(
        map((faqs): faqDisplay[] =>
          faqs.map((faq) => ({
            ...faq,
            open: false,
          }))
        ),
        tap((faqs) => this.faqs.set(faqs)),
        catchError(this.handleHttpError),
        finalize(() => this._isLoading.set(false))
      )
      
      obs.subscribe();
  };

  postFaq = (data: faqPayload): Observable<Message> => {
    return this.http.post<Message>(this.url, data, { withCredentials: true });
  };

  getOneFaq = (id: number): Observable<faq> => {
    this._isLoading.set(true);
    return this.http.get<faq>(`${this.url}/${id}`).pipe(
      catchError(this.handleHttpError),
      finalize(() => this._isLoading.set(false))
    );
  };

  deleteFaq = (id: number): Observable<Message> => {
    return this.http.delete<Message>(`${this.url}/${id}`, {
      withCredentials: true,
    });
  };
}
