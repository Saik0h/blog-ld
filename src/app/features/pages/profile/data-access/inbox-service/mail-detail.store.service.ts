import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, EMPTY, finalize, map, Observable, tap } from 'rxjs';
import { InboxApiService } from './inbox-api.service';
import { Mail, Message } from '../../../../../core/utils/types';

@Injectable({
  providedIn: 'root',
})
export class MailDetailService {
  private api = inject(InboxApiService);

  private _isLoading = signal<boolean>(false);
  public isLoading = this._isLoading.asReadonly();

  private _hasError = signal<boolean>(false);
  public readonly hasError = this._hasError.asReadonly();

  private _mail = signal<Mail | null>(null);
  public readonly mail = this._mail.asReadonly();

  private handleError = (err: HttpErrorResponse) => {
    this._hasError.set(true);
    return EMPTY;
  };


  public init(id: string) {
    this.getMail(id).subscribe();
  }

  private getMail(id: string): Observable<Mail> {
    this._isLoading.set(true);
    this._hasError.set(false);

    const obs = this.api.getOneMail(id).pipe(
      map((mail) => {
        return {
          ...mail,
          read: true,
        };
      }),
      tap((mail) => {
        this._mail.set(mail);
        this.markMailAsRead(mail.id);
      }),
      catchError(this.handleError),
      finalize(() => {
        this._isLoading.set(false);
      })
    );

    return obs;
  }

  public deleteMail = (): Observable<Message> => {
    return this.api.deleteMail(this.mail()!.id);
  };

  public markMailAsRead = (id: string): Observable<Message> => {
    return this.api.markMailAsRead(id);
  };
}
