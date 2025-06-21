import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginPayload, RegisterPayload, User, Message } from '../utils/types';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url = environment.apiUrl + '/auth';
  private readonly http = inject(HttpClient);
  public isLoggedIn = signal<boolean>(false);
  public user = signal<User | null>(null);

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

  status = (): Observable<boolean> => {
    const url = `${this.url}/status`;
    return this.http.get<boolean>(url, {
      withCredentials: true,
    });
  };

  getAuthorization = (): Observable<boolean> => {
    const url = `${this.url}/isAdmin`;
    return this.http.get<boolean>(url, { withCredentials: true });
  };

  getUser = (): Observable<User> => {
    const url = `${this.url}/user`;
    return this.http.get<User>(url, {
      withCredentials: true,
    });
  };

  refresh = (): Observable<Message> => {
    const url = `${this.url}/refresh`;
    return this.http.post<Message>(url, {}, { withCredentials: true });
  };

  logout = (): Observable<Message> => {
    const url = `${this.url}/logout`;
    return this.http.post<Message>(url, {}, { withCredentials: true });
  };
}
