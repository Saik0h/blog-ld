import { inject, Injectable, signal } from '@angular/core';
import { catchError, EMPTY, finalize, map, Observable, switchMap } from 'rxjs';
import {
  Artigo,
  ArtigoCreatePayload,
  ArtigoUpdatePayload,
  Message,
} from '../utils/types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ErrorService } from './error.service';
import { ImageService } from './image.service';
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
imageService = inject(ImageService);

  getAll = (): Observable<Artigo[]> => {
    this._isLoading.set(true);
    const obs = this.http
      .get<Artigo[]>(this.url, { withCredentials: true })
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

  create = (data: ArtigoCreatePayload,img: File,
    imgFolder: string): Observable<Message> => {
    return this.imageService.uploadImage(img, imgFolder).pipe(
      map(response => {
        data.image = response.url;
        return data;
      }),
      switchMap((dataWithImage) => {
        return this.http.post<Message>(this.url, dataWithImage, {
          withCredentials: true,
        });
      })
    );
  };

  getOne = (id: number): Observable<Artigo> => {
    const url = `${this.url}/${id}`;
    this._isLoading.set(true);
    const obs = this.http.get<Artigo>(url, { withCredentials: true }).pipe(
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

  update = (data: ArtigoUpdatePayload): Observable<Message> => {
    const url = `${this.url}/${data.id}`;
    return this.http.get<Message>(url, { withCredentials: true });
  };

  delete = (id: number): Observable<Message> => {
    const url = `${this.url}/${id}`;
    return this.http.get<Message>(url, { withCredentials: true });
  };
}
