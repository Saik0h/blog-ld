import { inject, Injectable, signal } from '@angular/core';
import { catchError, EMPTY, finalize, Observable } from 'rxjs';
import {
  Material,
  MaterialCreatePayload,
  MaterialUpdatePayload,
  Message,
  PostCreatedResponse,
} from '../utils/types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  private readonly url = environment.apiUrl + '/materials';

  private http = inject(HttpClient);
  private handleError = inject(ErrorService).handleHTTPError;

  private _isLoading = signal<boolean>(false);
  private _hasError = signal<boolean>(false);
  private _materials = signal<Material[]>([]);

  public readonly isLoading = this._isLoading.asReadonly();
  public readonly hasError = this._hasError.asReadonly();
  public readonly materials = this._materials.asReadonly();

  handleHttpError = (err: HttpErrorResponse) => {
    this.handleError(err);
    this._hasError.set(true);
    return EMPTY;
  };

  loadAllMaterials = (): Observable<Material[]> => {
    this._isLoading.set(true);

    return this.http.get<Material[]>(this.url, { withCredentials: true }).pipe(
      catchError(this.handleHttpError),
      finalize(() => {
        this._isLoading.set(false);
      })
    );
  };

  create = (data: MaterialCreatePayload): Observable<PostCreatedResponse> => {
    return this.http.post<PostCreatedResponse>(this.url, data, {
      withCredentials: true,
    });
  };

  getOne = (id: number): Observable<Material> => {
    const url = `${this.url}/${id}`;
    this._isLoading.set(true)

    return this.http.get<Material>(url, { withCredentials: true }).pipe(
      catchError(this.handleHttpError),
      finalize(() => {
        this._isLoading.set(false);
      })
    );
  };

  update = (data: MaterialUpdatePayload): Observable<Message> => {
    const url = `${this.url}/${data.id}`;
    return this.http.patch<Message>(url, { withCredentials: true });
  };

  delete = (id: number): Observable<Message> => {
    const url = `${this.url}/${id}`;
    this._isLoading.set(true);

    return this.http.delete<Message>(url, { withCredentials: true }).pipe(
      catchError(this.handleHttpError),
      finalize(() => this._isLoading.set(false))
    );
  };
}
