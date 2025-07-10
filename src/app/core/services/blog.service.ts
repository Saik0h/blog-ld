import { inject, Injectable, signal } from '@angular/core';
import {
  catchError,
  empty,
  EMPTY,
  finalize,
  lastValueFrom,
  map,
  Observable,
  switchMap,
} from 'rxjs';
import {
  Blog,
  BlogCreatePayload,
  BlogUpdatePayload,
  Message,
  PostCreatedResponse,
} from '../utils/types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ErrorService } from './error.service';
import { ImageService } from './image.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private http = inject(HttpClient);
  private readonly url = environment.apiUrl + '/blogs';
  private _isLoading = signal<boolean>(false);
  public isLoading = this._isLoading.asReadonly;
  private handleError = inject(ErrorService).handleHTTPError;
  private _hasError = signal<boolean>(false);
  public hasError = this._hasError.asReadonly;
  private readonly router = inject(Router);
  handleHttpError = (err: HttpErrorResponse) => {
    this.handleError(err);
    this._hasError.set(true);
    return EMPTY;
  };

  getAll = (): Observable<Blog[]> => {
    this._isLoading.set(true);

    return this.http.get<Blog[]>(this.url, { withCredentials: true }).pipe(
      catchError(this.handleHttpError),
      finalize(() => this._isLoading.set(false))
    );
  };

  create = (data: BlogCreatePayload): Observable<PostCreatedResponse> => {
    return this.http.post<PostCreatedResponse>(this.url, data, {
      withCredentials: true,
    });
  };

  getOne = (id: number): Observable<Blog> => {
    const url = `${this.url}/${id}`;
    this._isLoading.set(true);

    return this.http.get<Blog>(url, { withCredentials: true }).pipe(
      catchError(this.handleHttpError),
      finalize(() => this._isLoading.set(false))
    );
  };

  update = (data: BlogUpdatePayload): Observable<Message> => {
    const url = `${this.url}/${data.id}`;
    return this.http.patch<Message>(url, { withCredentials: true });
  };

  delete = (id: number): Observable<Message> => {
    const url = `${this.url}/${id}`;
    this._isLoading.set(true);
    
    return this.http.delete<Message>(url, { withCredentials: true }).pipe(
      catchError(this.handleHttpError),
      finalize(() => {
        this.router.navigate(['blogs']);
        this._isLoading.set(false);
      })
    );
  };
}
