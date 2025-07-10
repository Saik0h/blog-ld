import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { MailPayload, Mail, Message } from '../utils/types';
import { catchError, EMPTY, finalize, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class InboxService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.apiUrl + '/inbox';

  private handleError = inject(ErrorService).handleHTTPError;

  private _isLoading = signal<boolean>(false);
  public isLoading = this._isLoading.asReadonly;

  private _hasError = signal<boolean>(false);
  public hasError = this._hasError.asReadonly;

  getAllMails = (): Observable<Mail[]> => {
    const obs = this.http.get<Mail[]>(this.url, { withCredentials: true }).pipe(
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

  getAllUnreadMails = (): Observable<Mail[]> => {
    const obs = this.http.get<Mail[]>(this.url, { withCredentials: true }).pipe(
      map((mails): Mail[] => {
        return mails.filter((mail: Mail) => {
          return mail.read === false;
        });
      }),
      catchError((err: HttpErrorResponse) => {
        this._hasError.set(true);
        this.handleError(err);
        return EMPTY;
      }),
      finalize(() => {
        this._isLoading.set(false);
      })
    );
    return obs;
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
