import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Material,
  MaterialCreatePayload,
  MaterialUpdatePayload,
  Message,
  PostCreatedResponse,
} from '../../../../core/utils/types';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MateriaisApiService {
  private readonly url = environment.apiUrl + '/materials';

  private http = inject(HttpClient);

  getAllMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(this.url, { withCredentials: true });
  }

  create(data: MaterialCreatePayload): Observable<PostCreatedResponse> {
    return this.http.post<PostCreatedResponse>(this.url, data, {
      withCredentials: true,
    });
  }

  getOne(id: number): Observable<Material> {
    return this.http.get<Material>(`${this.url}/${id}`, {
      withCredentials: true,
    });
  }

  update(data: MaterialUpdatePayload): Observable<Message> {
    return this.http.patch<Message>(`${this.url}/${data.id}`, {
      withCredentials: true,
    });
  }

  delete(id: number): Observable<Message> {
    return this.http.delete<Message>(`${this.url}/${id}`, {
      withCredentials: true,
    });
  }
}
