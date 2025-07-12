import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  Curriculum,
  CurriculumCreatePayload,
  CurriculumUpdatePayload,
  CreateFieldPayload,
  Message,
  UpdateFieldPayload,
  CreateContactInfoPayload,
  UpdateContactInfoPayload,
  FieldItem,
  Field,
  UpdateMessage,
  CreatedFieldMessage,
  CreatedFieldItemMessage,
  ContactInfo,
  CreatedContactMessage,
} from '../utils/types';
import { catchError, EMPTY, finalize, Observable, tap } from 'rxjs';
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

  private _curriciculum = signal<Curriculum | null>(null);
  public readonly curriculum = this._curriciculum.asReadonly;

  private _contactInfo = signal<ContactInfo[] | null>(null);
  public readonly contactInfo = this._contactInfo.asReadonly;

  private _fields = signal<Field[] | null>(null);
  public readonly fields = this._fields.asReadonly;
  private _isLoadingFields = signal<boolean>(false);
  public readonly isLoadingFields = this._isLoadingFields.asReadonly;

  private readonly handleHttpError = (err: HttpErrorResponse) => {
    this.handleError(err);
    this._hasError.set(true);
    return EMPTY;
  };

  public readonly loadCurriculum = () => {
    this.getCurriculum().subscribe();
    this.getContactItems().subscribe();
    this.getFields().subscribe();
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
      tap((curriculumFromResponse: Curriculum) =>
        this._curriciculum.set(curriculumFromResponse)
      ),
      catchError(this.handleHttpError),
      finalize(() => this._isRequestingGet.set(false))
    );
  };

  getFields = (): Observable<Field[]> => {
    this._isLoadingFields.set(true);
    return this.http.get<Field[]>(this.url + '/fields').pipe(
      tap((fieldsFromResponse: Field[]) =>
        this._fields.set(fieldsFromResponse)
      ),
      catchError(this.handleHttpError),
      finalize(() => this._isLoadingFields.set(false))
    );
  };

  getContactItems = () => {
    this._isRequestingGet.set(true);
    return this.http.get<ContactInfo[]>(this.url + '/contact').pipe(
      tap((field) => this._contactInfo.set(field)),
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

  createField = (data: CreateFieldPayload): Observable<CreatedFieldMessage> => {
    this._isRequestingCreateOrUpdate.set(true);

    return this.http
      .post<CreatedFieldMessage>(`${this.url}/field`, data, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          console.log(response);
          this._fields.update((current) => {
            if (!current) return [response.field];
            return [...current, response.field];
          });
        }),
        catchError(this.handleHttpError),
        finalize(() => this._isRequestingCreateOrUpdate.set(false))
      );
  };
  createFieldItem = (data: {
    fieldId: string;
    description: string;
  }): Observable<CreatedFieldItemMessage> => {
    this._isRequestingCreateOrUpdate.set(true);

    return this.http
      .post<CreatedFieldItemMessage>(`${this.url}/field/item`, data, {
        withCredentials: true,
      })
      .pipe(
        tap((res) => {
          const { fieldId } = data;
          this._fields.update((current) => {
            if (!current) return null;

            return current.map((field) =>
              field.id === fieldId
                ? {
                    ...field,
                    items: [...field.items, res.fieldItem],
                  }
                : field
            );
          });
        }),
        catchError(this.handleHttpError),
        finalize(() => this._isRequestingCreateOrUpdate.set(false))
      );
  };

  updateFieldTitle = (data: UpdateFieldPayload): Observable<UpdateMessage> => {
    return this.http
      .patch<UpdateMessage>(`${this.url}/field/${data.id}`, data, {
        withCredentials: true,
      })
      .pipe(
        tap((_data) => {
          this._curriciculum.update((current) => {
            if (!current) return null;

            return {
              ...current,
              fields: current.fields.map((field) =>
                field.id === data.id ? { ...field, title: _data.data } : field
              ),
            };
          });
        }),
        catchError(this.handleHttpError)
      );
  };

  updateFieldItem = (data: FieldItem): Observable<UpdateMessage> => {
    const { id } = data;
    return this.http
      .patch<UpdateMessage>(`${this.url}/field/item/${id}`, data, {
        withCredentials: true,
      })
      .pipe(
        tap((_data) => {
          this._curriciculum.update((current) => {
            if (!current) return null;

            return {
              ...current,
              fields: [...current.fields],
            };
          });
        }),
        catchError(this.handleHttpError)
      );
  };

  deleteField = (id: string): Observable<Message> => {
    this._isRequestingDelete.set(true);
    return this.http
      .delete<Message>(`${this.url}/field/${id}`, {
        withCredentials: true,
      })
      .pipe(
        tap(() =>
          this._fields.update((current) => {
            if (!current) return null;
            return current.filter((field) => field.id !== id);
          })
        ),
        catchError(this.handleHttpError),
        finalize(() => this._isRequestingDelete.set(false))
      );
  };

  deleteFieldItem = (fieldItem: FieldItem): Observable<Message> => {
    this._isRequestingDelete.set(true);
    const { id, fieldId } = fieldItem;
    return this.http
      .delete<Message>(`${this.url}/field/item/${id}`, {
        withCredentials: true,
      })
      .pipe(
        tap(() =>
          this._fields.update((current) => {
            if (!current) return null;

            return current.map((field) =>
              field.id === fieldId
                ? {
                    ...field,
                    items: field.items.filter((item) => item.id !== id),
                  }
                : field
            );
          })
        ),
        catchError(this.handleHttpError),
        finalize(() => this._isRequestingDelete.set(false))
      );
  };

  createContactInfo = (
    data: CreateContactInfoPayload
  ): Observable<CreatedContactMessage> => {
    return this.http
      .post<CreatedContactMessage>(`${this.url}/contact`, data, {
        withCredentials: true,
      })
      .pipe(
        tap((res) => {
          this._contactInfo.update((current) => {
            if (!current) return null;
            return [...current, res.item];
          });
        }),
        catchError(this.handleHttpError),
        finalize(() => this._isRequestingCreateOrUpdate.set(false))
      );
  };

  updateContactInfo = (
    data: UpdateContactInfoPayload
  ): Observable<CreatedContactMessage> => {
    this._isRequestingCreateOrUpdate.set(true);
    return this.http
      .patch<CreatedContactMessage>(`${this.url}/contact/${data.id}`, data, {
        withCredentials: true,
      })
      .pipe(
        tap((res) => {
          this._contactInfo.update((current) => {
            if (!current) return null;
            return current.map((item) =>
              item.id === res.item.id ? res.item : item
            );
          });
        }),
        catchError(this.handleHttpError),
        finalize(() => this._isRequestingCreateOrUpdate.set(false))
      );
  };

  deleteContactInfo = (id: number): Observable<Message> => {
    this._isRequestingDelete.set(true);
    return this.http
      .delete<Message>(`${this.url}/contact/${id}`, {
        withCredentials: true,
      })
      .pipe(
        tap(() =>
          this._contactInfo.update((current) => {
            if (!current) return null;
            return current.filter((item) => item.id !== id);
          })
        ),
        catchError(this.handleHttpError),
        finalize(() => this._isRequestingDelete.set(false))
      );
  };
}
