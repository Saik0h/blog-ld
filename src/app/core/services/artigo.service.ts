import { inject, Injectable, signal } from '@angular/core';
import {
  catchError,
  EMPTY,
  finalize,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import {
  Artigo,
  ArtigoCreatePayload,
  ArtigoUpdatePayload,
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
export class ArtigoService {
  private http = inject(HttpClient);
  private readonly url = environment.apiUrl + '/articles';
  private _isLoading = signal<boolean>(false);
  public isLoading = this._isLoading.asReadonly;
  private handleError = inject(ErrorService).handleHTTPError;
  private _hasError = signal<boolean>(false);
  public hasError = this._hasError.asReadonly;
  private readonly router = inject(Router);
  private handleHttpError = (err: HttpErrorResponse) => {
    this.handleError(err);
    this._hasError.set(true);
    return EMPTY;
  };

  getAll = (): Observable<Artigo[]> => {
    this._isLoading.set(true);

    return this.http.get<Artigo[]>(this.url, { withCredentials: true }).pipe(
      catchError(this.handleHttpError),
      finalize(() => {
        this._isLoading.set(false);
      })
    );
  };

  create = (data: ArtigoCreatePayload): Observable<PostCreatedResponse> => {
    return this.http.post<PostCreatedResponse>(this.url, data, {
      withCredentials: true,
    });
  };

  getOne = (id: number): Observable<Artigo> => {
    const url = `${this.url}/${id}`;
    this._isLoading.set(true);

    return this.http.get<Artigo>(url, { withCredentials: true }).pipe(
      catchError(this.handleHttpError),
      finalize(() => this._isLoading.set(false))
    );
  };

  update = (data: ArtigoUpdatePayload): Observable<Message> => {
    const url = `${this.url}/${data.id}`;
    return this.http.patch<Message>(url, { withCredentials: true }).pipe(
      catchError(this.handleHttpError),
      finalize(() => this._isLoading.set(false))
    );
  };

  delete = (id: number): Observable<Message> => {
    const url = `${this.url}/${id}`;
    this._isLoading.set(true);
    return this.http.delete<Message>(url, { withCredentials: true }).pipe(
      catchError(this.handleHttpError),
      finalize(() => {
        this.router.navigate(['artigos']);
        this._isLoading.set(false);
      })
    );
  };
}
