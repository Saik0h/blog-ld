import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message, PostPayload, User } from '../utils/types';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private readonly url = 'https://laisdonida-be.onrender.com/api';

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

  updateProfilePhoto = (id: number, pfpUrl: string) => {
    const url = `${this.url}/users/${id}`;
    return this.http.patch(
      url,
      { profileImage: pfpUrl },
      { withCredentials: true }
    );
  };

 
}
