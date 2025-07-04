import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message, User } from '../utils/types';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private readonly url = environment.apiUrl;

  getMe = (): Observable<User> => {
    return this.http.get<User>(`${this.url}/auth/user`, {
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
