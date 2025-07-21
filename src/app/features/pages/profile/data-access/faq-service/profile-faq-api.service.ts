import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment.development';
import {
  faqDisplay,
  faq,
  faqPayload,
  Message,
} from '../../../../../core/utils/types';

@Injectable({
  providedIn: 'root',
})
export class FaqApiProfileService {
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
