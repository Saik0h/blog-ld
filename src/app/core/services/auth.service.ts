import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginPayload, RegisterPayload, User, Message } from '../utils/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url = 'http://localhost:3000/api/auth';
  private readonly http = inject(HttpClient);
  public isAuthenticated = signal<boolean>(false)

  register = (data: RegisterPayload): Observable<Message> => {
    const url = `${this.url}/register`;
    return this.http.post<Message>(url, data, {
      withCredentials: true,
    });
  };

  login = (data: LoginPayload): Observable<Message> => {
    const url = `${this.url}/login`;
    return this.http.post<Message>(url, data, {
      withCredentials: true,
    });
  };

  getUser = (): Observable<User> => {
    return this.http.get<User>(`${this.url}/status`, {
      withCredentials: true,
    });
  };

  refresh = (): Observable<Message> => {
    return this.http.post<Message>(
      `${this.url}/refresh`,
      {},
      { withCredentials: true }
    );
  };

  logout = (): Observable<Message> => {
    return this.http.post<Message>(
      `${this.url}/logout`,
      {},
      { withCredentials: true }
    );
  };

}
