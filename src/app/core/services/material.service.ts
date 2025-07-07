import { inject, Injectable, signal } from '@angular/core';
import { catchError, EMPTY, finalize, Observable } from 'rxjs';
import {
  Material,
  MaterialCreatePayload,
  MaterialUpdatePayload,
  Message,
} from '../utils/types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  private http = inject(HttpClient);
  private readonly url = environment.apiUrl + '/materials';
  private _isLoading = signal<boolean>(false);
  public isLoading = this._isLoading.asReadonly;
  private handleError = inject(ErrorService).handleHTTPError;
  private _hasError = signal<boolean>(false);
  public hasError = this._hasError.asReadonly;
  
  getAll = (): Observable<Material[]> => {
    this._isLoading.set(true);
    const obs = this.http
      .get<Material[]>(this.url, { withCredentials: true })
      .pipe(
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

  create = (data: MaterialCreatePayload): Observable<Message> => {
    return this.http.post<Message>(this.url, data, { withCredentials: true });
  };

  getOne = (id: number): Observable<Material> => {
    const url = `${this.url}/${id}`;
    return this.http.get<Material>(url, { withCredentials: true });
  };

  update = (data: MaterialUpdatePayload): Observable<Message> => {
    const url = `${this.url}/${data.id}`;
    return this.http.get<Message>(url, { withCredentials: true });
  };

  delete = (id: number): Observable<Message> => {
    const url = `${this.url}/${id}`;
    return this.http.get<Message>(url, { withCredentials: true });
  };
}
