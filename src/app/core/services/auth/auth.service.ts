import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, EMPTY, finalize, map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import {
  User,
  RegisterPayload,
  Message,
  LoginPayload,
} from '../../utils/types';
import { ErrorService } from '../error.service';
import { AuthApiService } from './auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  private readonly router = inject(Router);
  private readonly errorService = inject(ErrorService);
  private readonly api = inject(AuthApiService);
  private _user = signal<User | null>(null);
  private _isLoggedIn = signal<boolean>(false);
  private _isAdmin = signal<boolean>(false);

  private _isLoading = signal<boolean>(false);
  private _hasError = signal<boolean>(false);

  private _message = signal<string>('');

  public user = this._user.asReadonly();
  public readonly isLoggedIn = this._isLoggedIn.asReadonly();
  public isAdmin = this._isAdmin.asReadonly();

  public isLoading = this._isLoading.asReadonly();
  public readonly hasError = this._hasError.asReadonly();

  public readonly message = this._message.asReadonly();

  private handleHttpError = (err: HttpErrorResponse) => {
    if (err.error.message) {
      this._message.set(this.errorService.singleErrorToString(err));
    }
    this._hasError.set(true);
    return EMPTY;
  };

  register = (data: RegisterPayload): Observable<Message> => {
    this._isLoading.set(true);
    const obs = this.api.register(data).pipe(
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
    this._isLoading.set(true);
    this._hasError.set(false);

    const obs = this.api.login(data).pipe(
      tap(() => {
        this._isLoggedIn.set(true);
        this.router.navigate(['profile']);
      }),
      catchError(this.handleHttpError),
      finalize(() => this._isLoading.set(false))
    );
    return obs;
  };

  clearCookies = (): Observable<Message> => {
    this._isLoading.set(true);

    return this.api.clearCookies().pipe(
      catchError(this.handleHttpError),
      finalize(() => {
        this._user.set(null);
        this._isLoggedIn.set(false);
        this._isLoading.set(false);
      })
    );
  };

  initialize = () => {
    this.status().subscribe((isLoggedIn) => {
      this._isLoggedIn.set(isLoggedIn);
      if (isLoggedIn) {
        this.getUser().subscribe();
        this.getAuthorization().subscribe();
      } else {
        this.clearCookies().subscribe(() => {
          this._user.set(null);
        });
      }
    });
  };

  getAuthorization() {
    return this.api.getAuthorization().pipe(
      tap((value: boolean) => {
        this._isAdmin.set(value);
        return value;
      })
    );
  }

  status = (): Observable<boolean> => {
    const obs = this.api.status().pipe(
      tap((value) => {
        this._isLoggedIn.set(value);
        return value;
      }),
      catchError(this.handleHttpError)
    );

    return obs;
  };

  getUser = (): Observable<User> => {
    this._isLoading.set(true);

    const obs = this.api.getUser().pipe(
      tap((user) => {
        this._user.set(user);
        this._isLoggedIn.set(true);
        return user;
      }),
      catchError(this.handleHttpError),
      finalize(() => {
        setTimeout(() => {
          this._isLoading.set(false);
        }, 5000);
      })
    );

    return obs;
  };

  refresh = (): Observable<Message> => {
    const obs = this.api.refresh().pipe(
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
    this._isLoading.set(true);

    return this.api.logout().pipe(
      catchError(this.handleHttpError),
      finalize(() => {
        this.router.navigate(['/']);
        this._isLoggedIn.set(false);
        this._isLoading.set(false);
      })
    );
  };

  forceLogout() {
    this.clearCookies().subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }
}
