import { inject, Injectable, signal } from '@angular/core';
import {
  faq,
  faqDisplay,
  faqPayload,
  Message,
} from '../../../../core/utils/types';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FaqApiService {
  private readonly url = environment.apiUrl + '/faq';

  private readonly http = inject(HttpClient);

  private _hasError = signal<boolean>(false);
  private _isLoading = signal<boolean>(false);

  public faqs = signal<faqDisplay[]>([]);
  public isLoading = this._isLoading.asReadonly();
  public hasError = this._hasError.asReadonly();

  getAllFaqs(): Observable<faq[]> {
    this._isLoading.set(true);
    return this.http.get<faqDisplay[]>(this.url);
  }

  postFaq = (data: faqPayload): Observable<Message> => {
    return this.http.post<Message>(this.url, data, { withCredentials: true });
  };

  getOneFaq = (id: number): Observable<faq> => {
    return this.http.get<faq>(`${this.url}/${id}`);
  };

  deleteFaq = (id: number): Observable<Message> => {
    return this.http.delete<Message>(`${this.url}/${id}`, {
      withCredentials: true,
    });
  };
}
