import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Artigo,
  ArtigoCreatePayload,
  ArtigoUpdatePayload,
  Message,
} from '../utils/types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ArtigoService {
  private http = inject(HttpClient);
  private readonly url = 'https://laisdonida-be.onrender.com/api/articles';

  getAll = (): Observable<Artigo[]> => {
    const url = `${this.url}`;
    return this.http.get<Artigo[]>(url, { withCredentials: true });
  };

  create = (data: ArtigoCreatePayload): Observable<Message> => {
    const url = `${this.url}`;
    return this.http.post<Message>(url, data, { withCredentials: true });
  };

  getOne = (id: number): Observable<Artigo> => {
    const url = `${this.url}/${id}`;
    return this.http.get<Artigo>(url, { withCredentials: true });
  };

  update = (data: ArtigoUpdatePayload): Observable<Message> => {
    const url = `${this.url}/${data.id}`;
    return this.http.get<Message>(url, { withCredentials: true });
  };
  
  delete = (id: number): Observable<Message> => {
    const url = `${this.url}/${id}`;
    return this.http.get<Message>(url, { withCredentials: true });
  };
}
