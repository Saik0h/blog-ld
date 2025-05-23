import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../../../core/utils/types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  url = 'http://localhost:3000/api';
  getMe(): Observable<User> {
    return this.http.get<User>(`${this.url}/auth/status`, {
      withCredentials: true,
    });
  }

  logout() {
    return this.http.post(
      `${this.url}/auth/logout`,
      {},
      { withCredentials: true }
    );
  }
}
