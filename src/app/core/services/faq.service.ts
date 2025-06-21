import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { faq, faqPayload, Message } from '../utils/types';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.apiUrl + '/faq';

  getAllFaqs = (): Observable<faq[]> => {
    return this.http.get<faq[]>(this.url);
  };

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
