import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, EMPTY, finalize, map, Observable, tap } from 'rxjs';
import { InboxApiService } from './inbox-api.service';
import { Mail, MailPayload, Message } from '../../../../../core/utils/types';

@Injectable({
  providedIn: 'root',
})
export class InboxStoreService {
  private api = inject(InboxApiService);

  private _isLoading = signal<boolean>(false);
  public isLoading = this._isLoading.asReadonly();

  private _hasError = signal<boolean>(false);
  public hasError = this._hasError.asReadonly();

  private _mails = signal<Mail[] | null>(null);
  public readonly mails = this._mails.asReadonly();

  private _unreadMails = signal<Mail[] | null>(null);
  public readonly unreadMails = this._unreadMails.asReadonly();

  private handleError = (err: HttpErrorResponse) => {
    this._hasError.set(true);
    console.log('erro');
    return EMPTY;
  };

  getAllMails = (): Observable<Mail[]> => {
    this._isLoading.set(true);

    const obs = this.api.getAllMails().pipe(
      tap((mails) => {
        this._mails.set(mails);
      }),
      catchError(this.handleError),
      finalize(() => {
        this._isLoading.set(false);
      })
    );
    return obs;
  };

  getAllUnreadMails = (): Observable<Mail[]> => {
    this._isLoading.set(true);
    const obs = this.api.getAllMails().pipe(
      map((mails): Mail[] => {
        return mails.filter((mail: Mail) => {
          return mail.read === false;
        });
      }),
      tap((unread) => this._unreadMails.set(unread)),
      catchError(this.handleError),
      finalize(() => this._isLoading.set(false))
    );
    return obs;
  };

  searchMails = (query: string): Observable<Mail[]> => {
    return this.api.searchMails(query);
  };

  postMail = (data: MailPayload): Observable<Message> => {
    return this.api.postMail(data);
  };

  getOneMail = (id: string): Observable<Mail> => {
    return this.api.getOneMail(id);
  };

  deleteMail = (id: string): Observable<Message> => {
    return this.api.deleteMail(id);
  };

  markMailAsRead = (id: string): Observable<Message> => {
    return this.markMailAsRead(id);
  };
}
