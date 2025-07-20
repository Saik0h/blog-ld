import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment.development';
import { Observable, tap, finalize } from 'rxjs';
import {
  Field,
  CreateFieldPayload,
  CreatedFieldMessage,
  CreatedFieldItemMessage,
  UpdateFieldPayload,
  UpdateMessage,
  FieldItem,
  Message,
} from '../../../../../core/utils/types';

@Injectable({
  providedIn: 'root',
})
export class FieldApiService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.apiUrl + '/curriculum/fields';

  getFields = (): Observable<Field[]> => {
    return this.http.get<Field[]>(this.url);
  };

  createField = (data: CreateFieldPayload): Observable<CreatedFieldMessage> => {
    return this.http.post<CreatedFieldMessage>(this.url, data, {
      withCredentials: true,
    });
  };

  createFieldItem(data: {
    fieldId: string;
    description: string;
  }): Observable<CreatedFieldItemMessage> {
    return this.http.post<CreatedFieldItemMessage>(`${this.url}/item`, data, {
      withCredentials: true,
    });
  }

  updateFieldTitle = (data: UpdateFieldPayload): Observable<UpdateMessage> => {
    return this.http.patch<UpdateMessage>(`${this.url}/${data.id}`, data, {
      withCredentials: true,
    });
  };

  updateFieldItem = (data: FieldItem): Observable<UpdateMessage> => {
    const { id } = data;
    return this.http.patch<UpdateMessage>(`${this.url}/item/${id}`, data, {
      withCredentials: true,
    });
  };

  deleteField = (id: string): Observable<Message> => {
    return this.http.delete<Message>(`${this.url}/field/${id}`, {
      withCredentials: true,
    });
  };

  deleteFieldItem = (fieldItem: FieldItem): Observable<Message> => {
    const { id } = fieldItem;
    return this.http.delete<Message>(`${this.url}/item/${id}`, {
      withCredentials: true,
    });
  };
}
