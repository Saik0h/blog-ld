import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  Curriculum,
  CurriculumCreatePayload,
  CurriculumUpdatePayload,
  CreateFieldPayload,
  Message,
  UpdateFieldPayload,
  ContactInfo,
  CreateContactInfoPayload,
  UpdateContactInfoPayload,
} from '../utils/types';
import { catchError, EMPTY, finalize, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurriculumService {
  private readonly url = 'https://laisdonida-be.onrender.com/api/curriculum';
  private readonly http = inject(HttpClient);
  private _isLoading = signal<boolean>(false);
  public isLoading = this._isLoading.asReadonly()

  createCurriculum = (data: CurriculumCreatePayload): Observable<Message> => {
    return this.http.post<Message>(`${this.url}`, data, {
      withCredentials: true,
    });
  };

  getCurriculum = (): Observable<Curriculum> => {
    const obs = this.http.get<Curriculum>(this.url).pipe(
      catchError((err) => {
        console.error(err)
        return EMPTY
      }),
      finalize(() => {
        this._isLoading.set(false)
      })
    )
    return obs
  };

  updateCurriculum = (data: CurriculumUpdatePayload): Observable<Message> => {
    return this.http.patch<Message>(`${this.url}`, data, {
      withCredentials: true,
    });
  };

  deleteCurriculum = (): Observable<Message> => {
    return this.http.delete<Message>(`${this.url}`, {
      withCredentials: true,
    });
  };

  createField = (data: CreateFieldPayload): Observable<Message> => {
    return this.http.post<Message>(`${this.url}/field`, data, {
      withCredentials: true,
    });
  };

  updateField = (data: UpdateFieldPayload): Observable<Message> => {
    return this.http.put<Message>(`${this.url}/field/${data.id}`, data, {
      withCredentials: true,
    });
  };

  deleteField = (id: number): Observable<Message> => {
    return this.http.delete<Message>(`${this.url}/field/${id}`, {
      withCredentials: true,
    });
  };

  createContactInfo = (data: CreateContactInfoPayload): Observable<Message> => {
    return this.http.post<Message>(`${this.url}/contact`, data, {
      withCredentials: true,
    });
  };

  updateContactInfo = (
    data: UpdateContactInfoPayload
  ): Observable<Message> => {
    return this.http.patch<Message>(`${this.url}/contact/${data.id}`, data, {
      withCredentials: true,
    });
  };

  deleteContactInfo = (id: number): Observable<Message> => {
    return this.http.delete<Message>(`${this.url}/contact/${id}`, {
      withCredentials: true,
    });
  };
}
