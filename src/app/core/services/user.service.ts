import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { Message, User } from '../utils/types';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private readonly url = environment.apiUrl;
  private _user = signal<User |typeof EMPTY>(EMPTY)
   user = this._user.asReadonly
  private _isLoading = signal<boolean>(false);
  public isLoading = this._isLoading.asReadonly;
  
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
