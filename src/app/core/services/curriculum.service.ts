import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  Curriculum,
  CurriculumBodyCreate,
  CurriculumDataUpdate,
  Message,
} from '../utils/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurriculumService {
  private readonly url = 'http://localhost:3000/api/curriculum';
  private readonly http = inject(HttpClient);

  createCurriculum = (body: CurriculumBodyCreate): Observable<Message> => {
    return this.http.post<Message>(`${this.url}`, body, {
      withCredentials: true,
    });
  };

  getCurriculum = (): Observable<Curriculum> => {
    return this.http.get<Curriculum>(`${this.url}`);
  };

  updateCurriculum = (data: CurriculumDataUpdate): Observable<Message> => {
    return this.http.patch<Message>(`${this.url}`, data, {
      withCredentials: true,
    });
  };

  deleteCurriculum = (): Observable<Message> => {
    return this.http.delete<Message>(`${this.url}`);
  };

  updateAcademicTitle = (body: { title: string }): Observable<Message> => {
    return this.http.patch<Message>(`${this.url}/academic`, body);
  };

  updateAcademicItem = (
    id: number,
    data: { description: string }
  ): Observable<Message> => {
    return this.http.patch<Message>(`${this.url}/academic/${id}`, data);
  };

  createAcademicItem = (data: { description: string }): Observable<Message> => {
    return this.http.post<Message>(`${this.url}/academic/item`, data);
  };

  deleteAcademicItem = (id: number): Observable<Message> => {
    return this.http.delete<Message>(`${this.url}/academic/${id}`);
  };

  updateTeachingTitle = (body: { title: string }): Observable<Message> => {
    return this.http.patch<Message>(`${this.url}/teaching`, body);
  };

  updateTeachingItem = (
    id: number,
    data: { description: string }
  ): Observable<Message> => {
    return this.http.patch<Message>(`${this.url}/teaching/${id}`, data);
  };

  createTeachingItem = (data: { description: string }): Observable<Message> => {
    return this.http.post<Message>(`${this.url}/teaching/item`, data);
  };

  deleteTeachingItem = (id: number): Observable<Message> => {
    return this.http.delete<Message>(`${this.url}/teaching/${id}`);
  };

  updateExperiencesTitle = (body: { title: string }): Observable<Message> => {
    return this.http.patch<Message>(`${this.url}/experience`, body);
  };

  updateExperiencesItem = (
    id: number,
    data: { description: string }
  ): Observable<Message> => {
    return this.http.patch<Message>(`${this.url}/experience/${id}`, data);
  };

  createExperiencesItem = (data: {
    description: string;
  }): Observable<Message> => {
    return this.http.post<Message>(`${this.url}/experience/item`, data);
  };

  deleteExperiencesItem = (id: number): Observable<Message> => {
    return this.http.delete<Message>(`${this.url}/experience/${id}`);
  };

  updateContactTitle = (body: { title: string }): Observable<Message> => {
    return this.http.patch<Message>(`${this.url}/contact`, body);
  };

  updateContactItem = (data: {
    id: number;
    label: string;
    link: string;
    platform: string;
  }): Observable<Message> => {
    return this.http.patch<Message>(`${this.url}/contact/${data.id}`, data, {
      withCredentials: true,
    });
  };

  createContactItem = (data: {
    label: string;
    link: string;
    platform: string;
  }): Observable<Message> => {
    return this.http.post<Message>(`${this.url}/contact/item`, data, {
      withCredentials: true,
    });
  };

  deleteContactItem = (id: number): Observable<Message> => {
    return this.http.delete<Message>(`${this.url}/contact/${id}`, {
      withCredentials: true,
    });
  };
}
