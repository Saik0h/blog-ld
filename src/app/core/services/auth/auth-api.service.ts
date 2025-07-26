import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { RegisterPayload, Message, LoginPayload, User } from '../../utils/types';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly url = environment.apiUrl + '/auth';
  private readonly http = inject(HttpClient);

  register = (data: RegisterPayload): Observable<Message> => {
    return this.http.post<Message>(`${this.url}/register`, data, {
      withCredentials: true,
    });
  };

  login(data: LoginPayload): Observable<Message> {
    return this.http.post<Message>(`${this.url}/login`, data, {
      withCredentials: true,
    });
  }

  clearCookies(): Observable<Message> {
    return this.http.post<Message>(
      `${this.url}/clear-cookies`,
      {},
      { withCredentials: true }
    );
  }

  status(): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/status`, {
      withCredentials: true,
    });
  }

  getAuthorization(): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/isAdmin`, {
      withCredentials: true,
    });
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.url}/user`, { withCredentials: true });
  }

  refresh(): Observable<Message> {
    return this.http.post<Message>(
      `${this.url}/refresh`,
      {},
      { withCredentials: true }
    );
  }

  logout(): Observable<Message> {
    return this.http.post<Message>(
      `${this.url}/logout`,
      {},
      { withCredentials: true }
    );
  }
}
