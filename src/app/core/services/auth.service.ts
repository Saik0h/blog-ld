import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom, lastValueFrom, Observable, throwError } from 'rxjs';
import { LoginPayload, RegisterPayload, User, Message } from '../utils/types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url = 'http://localhost:3000/api/auth';
  private readonly http = inject(HttpClient);
  public isLoggedIn = signal<boolean>(false);
  private readonly router = inject(Router);
  public user = signal<User | null>(null);

  register = (data: RegisterPayload): Message => {
    const url = `${this.url}/register`;
    try {
      this.http
        .post<Message>(url, data, {
          withCredentials: true,
        })
        .subscribe({
          next: () => {},
          error: (err) => {
            throwError(() => {
              err;
            });
          },
          complete: () => {
            this.isLoggedIn.set(true);
            this.router.navigate(['profile']);
          },
        });
      return { message: 'Registro efetuado com sucesso' };
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  login = (data: LoginPayload): Message => {
    const url = `${this.url}/login`;
    try {
      this.http
        .post<Message>(url, data, {
          withCredentials: true,
        })
        .subscribe({
          next: () => {},
          error: (err) => {
            throwError(() => err);
          },
          complete: () => {
            this.isLoggedIn.set(true);
            this.router.navigate(['profile']);
          },
        });
      return { message: 'Login efetuado com sucesso' };
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  getUser = (): Message => {
    this.http
      .get<User>(`${this.url}/user`, {
        withCredentials: true,
      })
      .subscribe({
        next: (res: User) => {
          this.user.set(res);
        },
        error: (err) => {
          this.isLoggedIn.set(false);
          throwError(() => err);
        },
        complete: () => {
          this.isLoggedIn.set(true);
        },
      });
    return { message: `Usuário Logado ${this.user()?.firstname}` };
  };

  refresh = (): Message => {
    try {
      this.http
        .post<Message>(`${this.url}/refresh`, {}, { withCredentials: true })
        .subscribe({
          next: () => {
            this.isLoggedIn.set(true);
          },
          error: (err) => {
            this.isLoggedIn.set(false);
            this.router.navigate(['login']);
            throwError(() => err);
          },
        });
    } catch (err) {
      console.log(err);
      throw err;
    }

    return { message: 'Usuário autenticado!' };
  };

  logout = (): Message => {
    this.http
      .post<Message>(`${this.url}/logout`, {}, { withCredentials: true })
      .subscribe({
        next: () => {
          this.isLoggedIn.set(false);
        },
        error: (err) => {
          this.isLoggedIn.set(false);
          this.router.navigate(['/']);
          throwError(() => err);
        },
        complete: () => {
          this.router.navigate(['/']);
        },
      });
    return { message: 'Usuário desconectado' };
  };
}
