import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MailPayload, Mail, Message } from '../utils/types';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class InboxService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.apiUrl + '/inbox';

  getAllMails = (): Observable<Mail[]> => {
    return this.http.get<Mail[]>(this.url, { withCredentials: true });
  };

  searchMails = (query: string): Observable<Mail[]> => {
    return this.http.get<Mail[]>(`${this.url}/search?q=${query}`, {
      withCredentials: true,
    });
  };

  postMail = (data: MailPayload): Observable<Message> => {
    return this.http.post<Message>(this.url, data);
  };

  getOneMail = (id: string): Observable<Mail> => {
    return this.http.get<Mail>(`${this.url}/${id}`, { withCredentials: true });
  };

  deleteMail = (id: string): Observable<Message> => {
    return this.http.delete<Message>(`${this.url}/${id}`, {
      withCredentials: true,
    });
  };

  markMailAsRead = (id: string): Observable<Message> => {
    return this.http.patch<Message>(
      `${this.url}/${id}`,
      {},
      { withCredentials: true }
    );
  };
}
