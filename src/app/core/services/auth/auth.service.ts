import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { LoginPayload, RegisterPayload, Tokens, User } from '../../utils/types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3000/api';
  private http = inject(HttpClient);
  private router = inject(Router);

  constructor(){
this.getUser()
  }


 register(payload: RegisterPayload) {
    const url = `${this.url}/auth/register`;
    return this.http.post<{ message: string }>(url, payload, { withCredentials: true }).pipe(
      tap(() => {
        this.router.navigate(['/perfil']);
      }),
      catchError((err) => throwError(() => err))
    );
  }

  login(payload: LoginPayload): Observable<{ message: string }> {
    const url = `${this.url}/auth/login`;
    return this.http.post<{ message: string }>(url, payload, { withCredentials: true }).pipe(
      tap(() => {
      }),
      catchError((err) => throwError(() => err))
    );
  }


   getUser = (): Observable<any> => {
    return this.http.get(`${this.url}/auth/status`, {withCredentials: true}).pipe(
      tap((user) => console.log(user)), 
      catchError((err) => {
        console.error('Erro ao buscar usuário:', err);
        return throwError(() => err);
      })
    );
  };

  uploadImage(file: File) {
    const token = localStorage.getItem('token');

    if (!token) {
      return throwError(() => new Error('Usuário não autenticado.'));
    }
    async function fileToBase64(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          const b64withoutprefix = (base64String: string) => {
            return base64String.replace(/^data:[^;]+;base64,/, '');
          };
          const base64withoutprefix = b64withoutprefix(base64String);
          resolve(base64withoutprefix);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    }

    const getUserIdAndSendUpload = fetch(`${this.url}/auth/status`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        const id = data.sub;
        const url = `${this.url}/users/${id}`;
        const finaleFile = await fileToBase64(file);
        console.log('finaleFile', finaleFile);
        return fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            profileImage: finaleFile,
          }),
        });
      })
      .catch((err) => {
        console.error('Erro ao buscar ID do usuário:', err);
        return throwError(() => err);
      });
    return getUserIdAndSendUpload;
  }

  updateUser(id: string, payload: User): Observable<any> {
    const url = `${this.url}/users/${id}`;
    const token = localStorage.getItem('token');
    return this.http
      .put(url, payload, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }
}
