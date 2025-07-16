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
  tap,
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
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private handleError = inject(ErrorService).handleHTTPError;

  private readonly url = environment.apiUrl + '/blogs';

  private _isLoading = signal<boolean>(false);
  private _hasError = signal<boolean>(false);
  private _blogs = signal<Blog[]>([]);

  public readonly blogs = this._blogs.asReadonly;
  public readonly isLoading = this._isLoading.asReadonly;
  public readonly hasError = this._hasError.asReadonly;

  private handleHttpError = (err: HttpErrorResponse) => {
    this.handleError(err);
    this._hasError.set(true);
    return EMPTY;
  };

  loadAllBlogs = (): Observable<Blog[]> => {
    this._isLoading.set(true);

    return this.http.get<Blog[]>(this.url, { withCredentials: true }).pipe(
      tap((blogs) => this._blogs.set(blogs)),
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
