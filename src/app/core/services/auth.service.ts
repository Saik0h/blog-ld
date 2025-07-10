import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  catchError,
  EMPTY,
  finalize,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { LoginPayload, RegisterPayload, User, Message } from '../utils/types';
import { environment } from '../../../environments/environment.development';
import { ErrorService } from './error.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router = inject(Router);
  private readonly url = environment.apiUrl + '/auth';
  private readonly http = inject(HttpClient);
  private _isLoggedIn = signal<boolean>(false);
  public readonly isLoggedIn = this._isLoggedIn.asReadonly;
  private _user = signal<User | null>(null);
  public user = this._user.asReadonly;
  private _isLoading = signal<boolean>(false);
  public isLoading = this._isLoading.asReadonly;
  private handleError = inject(ErrorService).handleHTTPError;
  private _hasError = signal<boolean>(false);
  public readonly hasError = this._hasError.asReadonly;

  private handleHttpError = (err: HttpErrorResponse) => {
    this.handleError(err);
    this._hasError.set(true);
    return EMPTY;
  };

  register = (data: RegisterPayload): Observable<Message> => {
    const url = `${this.url}/register`;
    this._isLoading.set(true);

    const obs = this.http
      .post<Message>(url, data, {
        withCredentials: true,
      })
      .pipe(
        map((newUserMsg) => {
          this.getUser().pipe(
            tap((user) => {
              this._user.set(user);
              return user;
            })
          );
          return newUserMsg;
        }),
        catchError(this.handleHttpError),
        finalize(() => {
          this._isLoading.set(false);
        })
      );
    this._isLoggedIn.set(true);
    return obs;
  };

  login = (data: LoginPayload): Observable<Message> => {
    const url = `${this.url}/login`;
    this._isLoading.set(true);
    const obs = this.http
      .post<Message>(url, data, {
        withCredentials: true,
      })
      .pipe(
        catchError(this.handleHttpError),
        finalize(() => {
          this._isLoading.set(false);
        })
      );
    this._isLoggedIn.set(true);

    return obs;
  };

  status = (): Observable<boolean> => {
    const url = `${this.url}/status`;
    const obs = this.http
      .get<boolean>(url, {
        withCredentials: true,
      })
      .pipe(
        map((value) => {
          this._isLoggedIn.set(value);
          return value;
        }),
        catchError(this.handleHttpError)
      );
    return obs;
  };

  getAuthorization = (): Observable<boolean> => {
    const url = `${this.url}/isAdmin`;
    return this.http.get<boolean>(url, { withCredentials: true });
  };

  getUser = (): Observable<User> => {
    const url = `${this.url}/user`;
    this._isLoading.set(true);
    const obs = this.http
      .get<User>(url, {
        withCredentials: true,
      })
      .pipe(
        catchError(this.handleHttpError),
        finalize(() => {
          this._isLoading.set(false);
        })
      );
    return obs;
  };

  refresh = (): Observable<Message> => {
    const url = `${this.url}/refresh`;

    return this.http.post<Message>(url, {}, { withCredentials: true }).pipe(
      map((value) => {
        this._isLoggedIn.set(true);
        return value;
      }),
      catchError((err: HttpErrorResponse) => {
        console.log(err)
        return throwError(() => err);
      })
    );
  };

  logout = (): Observable<Message> => {
    const url = `${this.url}/logout`;
    this._isLoading.set(true);

    return this.http.post<Message>(url, {}, { withCredentials: true }).pipe(
      catchError((err: HttpErrorResponse) => {
        this.handleError(err);
        return EMPTY;
      }),
      finalize(() => {
        this.router.navigate(['/auth']);
        this._isLoggedIn.set(false);
        this._isLoading.set(false);
      })
    );
  };

  forceLogout() {
    const url = this.url + '/force-logout';
    this._isLoading.set(true);

    return this.http.post<Message>(url, {}, { withCredentials: true }).pipe(
      catchError(this.handleHttpError),
      finalize(() => {
        this.router.navigate(['/']);
        this._isLoggedIn.set(false);
        this._isLoading.set(false);
      })
    );
  }
}
