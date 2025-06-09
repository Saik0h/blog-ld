import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Material,
  MaterialCreatePayload,
  MaterialUpdatePayload,
  Message,
} from '../utils/types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  private http = inject(HttpClient);
  private readonly url = 'http://localhost:3000/api/materials';

  getAll = (): Observable<Material[]> => {
    const url = `${this.url}`;
    return this.http.get<Material[]>(url, { withCredentials: true });
  };

  create = (data: MaterialCreatePayload): Observable<Message> => {
    const url = `${this.url}`;
    return this.http.post<Message>(url, data, { withCredentials: true });
  };

  getOne = (id: number): Observable<Material> => {
    const url = `${this.url}/${id}`;
    return this.http.get<Material>(url, { withCredentials: true });
  };

  update = (data: MaterialUpdatePayload): Observable<Message> => {
    const url = `${this.url}/${data.id}`;
    return this.http.get<Message>(url, { withCredentials: true });
  };
  
  delete = (id: number): Observable<Message> => {
    const url = `${this.url}/${id}`;
    return this.http.get<Message>(url, { withCredentials: true });
  };
}
