import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { faq, faqPayload, Message } from '../utils/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  private readonly http = inject(HttpClient);
  private readonly url = 'http://localhost:3000/api/faq';


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
