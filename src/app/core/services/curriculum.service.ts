import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  Curriculum,
  CurriculumCreatePayload,
  CurriculumUpdatePayload,
  CreateFieldPayload,
  Message,
  UpdateFieldPayload,
  ContactInfo,
  CreateContactInfoPayload,
  UpdateContactInfoPayload,
} from '../utils/types';
import { catchError, EMPTY, finalize, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class CurriculumService {
  private readonly url = environment.apiUrl + '/curriculum';
  private readonly http = inject(HttpClient);

  private _isRequestingGet = signal<boolean>(false);
  public isRequestingGet = this._isRequestingGet.asReadonly;

  private _isRequestingCreateOrUpdate = signal<boolean>(false);
  public isRequestingCreateOrUpdate =
    this._isRequestingCreateOrUpdate.asReadonly;

  private _isRequestingDelete = signal<boolean>(false);
  public isRequestingDelete = this._isRequestingDelete.asReadonly;

  private _hasError = signal<boolean>(false);
  public hasError = this._hasError.asReadonly;

  private readonly handleError = inject(ErrorService).handleHTTPError;

  private readonly handleHttpError = (err: HttpErrorResponse) => {
    this.handleError(err);
    this._hasError.set(true);
    return EMPTY;
  };

  createCurriculum = (data: CurriculumCreatePayload): Observable<Message> => {
    this._isRequestingCreateOrUpdate.set(true);
    return this.http
      .post<Message>(`${this.url}`, data, {
        withCredentials: true,
      })
      .pipe(
        catchError(this.handleHttpError),
        finalize(() => this._isRequestingCreateOrUpdate.set(false))
      );
  };

  getCurriculum = (): Observable<Curriculum> => {
    this._isRequestingGet.set(true);
    return this.http.get<Curriculum>(this.url).pipe(
      catchError(this.handleHttpError),
      finalize(() => this._isRequestingGet.set(false))
    );
  };

  updateCurriculum = (data: CurriculumUpdatePayload): Observable<Message> => {
    this._isRequestingCreateOrUpdate.set(true);
    return this.http
      .patch<Message>(`${this.url}`, data, {
        withCredentials: true,
      })
      .pipe(
        catchError(this.handleHttpError),
        finalize(() => this._isRequestingCreateOrUpdate.set(false))
      );
  };

  deleteCurriculum = (): Observable<Message> => {
    this._isRequestingDelete.set(true);
    return this.http
      .delete<Message>(`${this.url}`, {
        withCredentials: true,
      })
      .pipe(
        catchError(this.handleHttpError),
        finalize(() => this._isRequestingDelete.set(false))
      );
  };

  createField = (data: CreateFieldPayload): Observable<Message> => {
    this._isRequestingCreateOrUpdate.set(true);

    return this.http
      .post<Message>(`${this.url}/field`, data, {
        withCredentials: true,
      })
      .pipe(
        catchError(this.handleHttpError),
        finalize(() => this._isRequestingCreateOrUpdate.set(false))
      );
  };

  updateField = (data: UpdateFieldPayload): Observable<Message> => {
    return this.http.patch<Message>(`${this.url}/field/${data.id}`, data, {
      withCredentials: true,
    }).pipe(
      catchError(this.handleHttpError)
    );
  };

  deleteField = (id: number): Observable<Message> => {
    return this.http.delete<Message>(`${this.url}/field/${id}`, {
      withCredentials: true,
    });
  };

  deleteFieldItem = (id: number): Observable<Message> => {
    return this.http.delete<Message>(`${this.url}/field/${id}`, {
      withCredentials: true,
    });
  };

  createContactInfo = (data: CreateContactInfoPayload): Observable<Message> => {
    return this.http.post<Message>(`${this.url}/contact`, data, {
      withCredentials: true,
    });
  };

  updateContactInfo = (data: UpdateContactInfoPayload): Observable<Message> => {
    return this.http.patch<Message>(`${this.url}/contact/${data.id}`, data, {
      withCredentials: true,
    });
  };

  deleteContactInfo = (id: number): Observable<Message> => {
    return this.http.delete<Message>(`${this.url}/contact/${id}`, {
      withCredentials: true,
    });
  };
}
