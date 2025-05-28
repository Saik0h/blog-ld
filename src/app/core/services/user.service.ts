import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message, Post, PostPayload, User } from '../utils/types';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private readonly url = 'http://localhost:3000/api';

  getMe = (): Observable<User> => {
    return this.http.get<User>(`${this.url}/auth/status`, {
      withCredentials: true,
    });
  };

  logout = (): Observable<Message> => {
    return this.http.post<Message>(
      `${this.url}/auth/logout`,
      {},
      { withCredentials: true }
    );
  };

  post = (body: PostPayload): Observable<Post> => {
    return this.http.post<Post>(`${this.url}/posts`, body, {
      withCredentials: true,
    });
  };
}
