import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Course,
  CourseCreatePayload,
  CourseUpdatePayload,
  Message,
} from '../utils/types';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private http = inject(HttpClient);
  private readonly url = environment.apiUrl + '/courses';

  getAll = (): Observable<Course[]> => {
    const url = `${this.url}`;
    return this.http.get<Course[]>(url, { withCredentials: true });
  };

  create = (data: CourseCreatePayload): Observable<Message> => {
    const url = `${this.url}`;
    return this.http.post<Message>(url, data, { withCredentials: true });
  };

  getOne = (id: number): Observable<Course> => {
    const url = `${this.url}/${id}`;
    return this.http.get<Course>(url, { withCredentials: true });
  };

  update = (data: CourseUpdatePayload): Observable<Message> => {
    const url = `${this.url}/${data.id}`;
    return this.http.get<Message>(url, { withCredentials: true });
  };
  
  delete = (id: number): Observable<Message> => {
    const url = `${this.url}/${id}`;
    return this.http.get<Message>(url, { withCredentials: true });
  };
}
