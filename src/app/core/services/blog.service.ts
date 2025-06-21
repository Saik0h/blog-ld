import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Blog,
  BlogCreatePayload,
  BlogUpdatePayload,
  Message,
} from '../utils/types';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private http = inject(HttpClient);
  private readonly url = environment.apiUrl +'/blogs';

  getAll = (): Observable<Blog[]> => {
    const url = `${this.url}`;
    return this.http.get<Blog[]>(url, { withCredentials: true });
  };

  create = (data: BlogCreatePayload): Observable<Message> => {
    const url = `${this.url}`;
    return this.http.post<Message>(url, data, { withCredentials: true });
  };

  getOne = (id: number): Observable<Blog> => {
    const url = `${this.url}/${id}`;
    return this.http.get<Blog>(url, { withCredentials: true });
  };

  update = (data: BlogUpdatePayload): Observable<Message> => {
    const url = `${this.url}/${data.id}`;
    return this.http.get<Message>(url, { withCredentials: true });
  };
  
  delete = (id: number): Observable<Message> => {
    const url = `${this.url}/${id}`;
    return this.http.get<Message>(url, { withCredentials: true });
  };
}
