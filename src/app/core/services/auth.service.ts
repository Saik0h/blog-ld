import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, EMPTY, finalize, map, Observable, tap } from 'rxjs';
import { LoginPayload, RegisterPayload, User, Message } from '../utils/types';
import { environment } from '../../../environments/environment.development';
import { ErrorService } from './error.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url = environment.apiUrl + '/auth';

  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private handleError = inject(ErrorService).handleHTTPError;

  private _isLoggedIn = signal<boolean>(false);
  private _user = signal<User | null>(null);
  private _isLoading = signal<boolean>(false);
  private _hasError = signal<boolean>(false);

  public user = this._user.asReadonly();
  public isLoading = this._isLoading.asReadonly();
  public readonly isLoggedIn = this._isLoggedIn.asReadonly();
  public readonly hasError = this._hasError.asReadonly();

  private handleHttpError = (err: HttpErrorResponse) => {
    this.handleError(err);
    this._hasError.set(true);
    return EMPTY;
  };

  register = (data: RegisterPayload): Observable<Message> => {
    const url = `${this.url}/register`;
    this._isLoading.set(true);

    const obs = this.http
      .post<Message>(url, data, { withCredentials: true })
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
        finalize(() => this._isLoading.set(false))
      );
    this._isLoggedIn.set(true);
    return obs;
  };

  login = (data: LoginPayload): Observable<Message> => {
    const url = `${this.url}/login`;
    this._isLoading.set(true);

    const obs = this.http
      .post<Message>(url, data, { withCredentials: true })
      .pipe(
        tap(() => {
          this._isLoggedIn.set(true);
          this.router.navigate(['profile']);
        }),
        catchError(this.handleHttpError),
        finalize(() => this._isLoading.set(false))
      );

    return obs;
  };

  initialize = () => {
    this.status().subscribe((isLoggedIn) => {
      this._isLoggedIn.set(isLoggedIn);
      if (isLoggedIn) {
        this.getUser().subscribe();
      } else {
        this.forceLogout().subscribe(() => {
          this._user.set(null);
        });
      }
    });
  };

  status = (): Observable<boolean> => {
    const url = `${this.url}/status`;

    const obs = this.http.get<boolean>(url, { withCredentials: true }).pipe(
      tap((value) => {
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

    const obs = this.http.get<User>(url, { withCredentials: true }).pipe(
      tap((user) => {
        this._user.set(user);
        this._isLoggedIn.set(true);
        return user;
      }),
      catchError(this.handleHttpError),
      finalize(() => this._isLoading.set(false))
    );

    return obs;
  };

  refresh = (): Observable<Message> => {
    const url = `${this.url}/refresh`;

    const obs = this.http
      .post<Message>(url, {}, { withCredentials: true })
      .pipe(
        tap((value) => {
          this._isLoggedIn.set(true);
          return value;
        }),
        catchError(this.handleHttpError)
      );
    this._isLoggedIn.set(true);
    return obs;
  };

  logout = (): Observable<Message> => {
    const url = `${this.url}/logout`;
    this._isLoading.set(true);

    return this.http.post<Message>(url, {}, { withCredentials: true }).pipe(
      catchError(this.handleHttpError),
      finalize(() => {
        this.router.navigate(['/']);
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
