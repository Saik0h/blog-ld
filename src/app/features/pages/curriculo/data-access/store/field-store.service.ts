import { inject, Injectable, signal } from '@angular/core';
import { FieldApiService } from '../api/field-api.service';
import {
  CreatedFieldItemMessage,
  CreatedFieldMessage,
  CreateFieldPayload,
  Field,
  FieldItem,
  UpdateFieldPayload,
} from '../../../../../core/utils/types';
import { tap, finalize, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FieldStoreService {
  private readonly api = inject(FieldApiService);

  private _fields = signal<Field[]>([]);
  readonly fields = this._fields.asReadonly();

  private _isLoading = signal(false);
  readonly isLoading = this._isLoading.asReadonly();

  initialize(): void {
    this.getFields().subscribe();
  }

  getFields(): Observable<Field[]> {
    this._isLoading.set(true);
    return this.api.getFields().pipe(
      tap((fields) => this._fields.set(fields)),
      finalize(() => this._isLoading.set(false))
    );
  }

  createField(data: CreateFieldPayload): Observable<CreatedFieldMessage> {
    this._isLoading.set(true);
    return this.api.createField(data).pipe(
      tap(({ field }) => this._fields.update((current) => [...current, field])),
      finalize(() => this._isLoading.set(false))
    );
  }

  createFieldItem(data: {
    fieldId: string;
    description: string;
  }): Observable<CreatedFieldItemMessage> {
    this._isLoading.set(true);
    return this.api.createFieldItem(data).pipe(
      tap(() => this.getFields().subscribe()),
      finalize(() => this._isLoading.set(false))
    );
  }

  updateFieldTitle(data: UpdateFieldPayload): Observable<any> {
    this._isLoading.set(true);
    return this.api.updateFieldTitle(data).pipe(
      tap(() => this.getFields().subscribe()),
      finalize(() => this._isLoading.set(false))
    );
  }

  updateFieldItem(data: FieldItem): Observable<any> {
    this._isLoading.set(true);
    return this.api.updateFieldItem(data).pipe(
      tap(() => this.getFields().subscribe()),
      finalize(() => this._isLoading.set(false))
    );
  }

  deleteField(id: string): Observable<any> {
    this._isLoading.set(true);
    return this.api.deleteField(id).pipe(
      tap(() => this.getFields().subscribe()),
      finalize(() => this._isLoading.set(false))
    );
  }

  deleteFieldItem(data: FieldItem): Observable<any> {
    this._isLoading.set(true);
    return this.api.deleteFieldItem(data).pipe(
      tap(() => this.getFields().subscribe()),
      finalize(() => this._isLoading.set(false))
    );
  }
}
