import { inject, Injectable, signal } from '@angular/core';
import { catchError, EMPTY, EmptyError, finalize, Observable } from 'rxjs';
import {
  Course,
  CourseCreatePayload,
  CourseUpdatePayload,
  Message,
} from '../utils/types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private http = inject(HttpClient);
  private readonly url = environment.apiUrl + '/courses';
  private _isLoading = signal<boolean>(false);
  public isLoading = this._isLoading.asReadonly;
  private handleError = inject(ErrorService).handleHTTPError;
  private _hasError = signal<boolean>(false);;
  public hasError = this._hasError.asReadonly;
  
  getAll = (): Observable<Course[]> => {
    this._isLoading.set(true);
    const obs = this.http.get<Course[]>(this.url, { withCredentials: true }).pipe(
      catchError((err: HttpErrorResponse) => {
        this.handleError(err);
        this._hasError.set(true);
        return EMPTY;
      }),
      finalize(() => {
        this._isLoading.set(false);
      })
    );
    return obs;
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
