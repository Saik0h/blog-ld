import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Artigo,
  ArtigoUpdatePayload,
  Message,
} from '../../../../core/utils/types';

@Injectable({
  providedIn: 'root',
})
export class ArtigoApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/api/articles';

  getAllArticles = (): Observable<Artigo[]> => {
    return this.http.get<Artigo[]>(this.baseUrl, { withCredentials: true });
  };

  getOneArticle = (id: string): Observable<Artigo> => {
    return this.http.get<Artigo>(`${this.baseUrl}/${id}`, {
      withCredentials: true,
    });
  };

  update = (data: ArtigoUpdatePayload): Observable<Message> => {
    return this.http.patch<Message>(`${this.baseUrl}/${data.id}`, {
      withCredentials: true,
    });
  };

  delete = (id: string): Observable<Message> => {
    return this.http.delete<Message>(`${this.baseUrl}/${id}`, {
      withCredentials: true,
    });
  };
}
