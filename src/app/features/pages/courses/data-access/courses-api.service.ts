import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { EMPTY, tap, catchError, finalize, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { ErrorService } from '../../../../core/services/error.service';
import {
  Course,
  CourseCreatePayload,
  Message,
  CourseUpdatePayload,
} from '../../../../core/utils/types';

@Injectable({
  providedIn: 'root',
})
export class CoursesApiService {
  private readonly url = environment.apiUrl + '/courses';
  private http = inject(HttpClient);

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url, { withCredentials: true });
  }

  create(data: CourseCreatePayload): Observable<Message> {
    return this.http.post<Message>(this.url, data, { withCredentials: true });
  }

  getOne(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.url}/${id}`, {
      withCredentials: true,
    });
  }

  update(data: CourseUpdatePayload): Observable<Message> {
    return this.http.get<Message>(`${this.url}/${data.id}`, {
      withCredentials: true,
    });
  }

  delete(id: number): Observable<Message> {
    return this.http.delete<Message>(`${this.url}/${id}`, {
      withCredentials: true,
    });
  }
}
