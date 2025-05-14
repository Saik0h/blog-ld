import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoginPayload, RegisterPayload, Tokens, User } from '../../types/types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3000/api';
  private http = inject(HttpClient);
  private router = inject(Router);

  register(payload: RegisterPayload): Observable<any> {
    const url = `${this.url}/auth/register`;
    return this.http.post(url, payload).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(() => err);
      })
    );
  }

  login(payload: LoginPayload): Observable<Tokens> {
    const url = `${this.url}/auth/login`;
    return this.http.post<Tokens>(url, payload).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(() => err);
      })
    );
  }

  validate(): Observable<any> {
    const url = `${this.url}/auth/status`;
    const token = localStorage.getItem('token');
    return this.http.get(url, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  validateCurrent() {
    const url = `${this.url}/auth/refresh-token`;
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post(url, { refreshToken }).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(() => err);
      })
    );
  }

  logout(id: string): Observable<any> {
    const url = `${this.url}/auth/logout`;
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/'])
    return this.http.post(url, {id}).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(() => err);
      })
    );
    // Outras ações de logout, como redirecionar ou limpar estado global
  }
  
  getUser = (id: string): Observable<any> => {
  const url = `${this.url}/users/${id}`;
  return this.http.get(url).pipe(
    tap(user => console.log(user)), // loga o resultado corretamente
    catchError(err => {
      console.error('Erro ao buscar usuário:', err);
      return throwError(() => err);
    })
  );
};
}
