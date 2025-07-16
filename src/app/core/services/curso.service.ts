import { inject, Injectable, signal } from '@angular/core';
import { catchError, EMPTY, EmptyError, finalize, Observable, tap } from 'rxjs';
import {
  Course,
  CourseCreatePayload,
  CourseUpdatePayload,
  Message,
  PostCreatedResponse,
} from '../utils/types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private readonly url = environment.apiUrl + '/courses';
  
  private http = inject(HttpClient);
  private handleError = inject(ErrorService).handleHTTPError;
  
  private _isLoading = signal<boolean>(false);
  private _hasError = signal<boolean>(false);
  private _courses = signal<Course[]>([]);
  
  public isLoading = this._isLoading.asReadonly();
  public hasError = this._hasError.asReadonly();
  public courses = this._courses.asReadonly();

  handleHttpError(err: HttpErrorResponse) {
    this.handleError(err);
    this._hasError.set(true);
    return EMPTY;
  }

  loadAllCourses = (): Observable<Course[]> => {
    this._isLoading.set(true);

    return this.http.get<Course[]>(this.url, { withCredentials: true }).pipe(
      tap((courses) => this._courses.set(courses)),
      catchError(this.handleHttpError),
      finalize(() => this._isLoading.set(false))
    );
  };

  create = (data: CourseCreatePayload): Observable<Message> => {
    const url = `${this.url}`;
    return this.http.post<Message>(url, data, { withCredentials: true });
  };

  getOne = (id: number): Observable<Course> => {
    const url = `${this.url}/${id}`;
    this._isLoading.set(true);
    return this.http.get<Course>(url, { withCredentials: true }).pipe(
      catchError(this.handleHttpError),
      finalize(() => this._isLoading.set(false))
    );
  };

  update = (data: CourseUpdatePayload): Observable<Message> => {
    const url = `${this.url}/${data.id}`;
    return this.http
      .get<Message>(url, { withCredentials: true })
      .pipe(catchError(this.handleHttpError));
  };

  delete = (id: number): Observable<Message> => {
    const url = `${this.url}/${id}`;
    this._isLoading.set(true);
    return this.http.delete<Message>(url, { withCredentials: true }).pipe(
      tap((res) => console.log(res)),
      catchError(this.handleHttpError),
      finalize(() => this._isLoading.set(false))
    );
  };
}
