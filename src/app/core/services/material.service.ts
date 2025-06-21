import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Material,
  MaterialCreatePayload,
  MaterialUpdatePayload,
  Message,
} from '../utils/types';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  private http = inject(HttpClient);
  private readonly url = environment.apiUrl + '/materials';

  getAll = (): Observable<Material[]> => {
    return this.http.get<Material[]>(this.url, { withCredentials: true });
  };

  create = (data: MaterialCreatePayload): Observable<Message> => {
    return this.http.post<Message>(this.url, data, { withCredentials: true });
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
