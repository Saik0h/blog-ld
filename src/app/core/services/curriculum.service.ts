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
}
