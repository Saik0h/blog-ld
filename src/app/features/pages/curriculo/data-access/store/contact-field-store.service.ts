import { inject, Injectable, signal } from '@angular/core';
import { tap, finalize, Observable } from 'rxjs';
import { ContactFieldApiService } from '../api/contact-field-api.service';
import {
  ContactInfo,
  CreateContactInfoPayload,
  CreatedContactMessage,
  Message,
  UpdateContactInfoPayload,
} from '../../../../../core/utils/types';

@Injectable({
  providedIn: 'root',
})
export class ContactFieldStoreService {
  private api = inject(ContactFieldApiService);

  private _contactInfo = signal<ContactInfo[] | null>(null);
  public readonly contactInfo = this._contactInfo.asReadonly();

  private _isLoading = signal<boolean>(false);
  public readonly isLoading = this._isLoading.asReadonly();

  initialize(): void {
    this.getContactItems()
      .pipe(tap((data) => this._contactInfo.set(data)))
      .subscribe();
  }

  getContactItems = (): Observable<ContactInfo[]> => {
    this._isLoading.set(true);
    return this.api.getContactItems().pipe(
      tap((field) => {
        this._contactInfo.set(field);
        console.log('Contact items loaded:', field);
      }),
      finalize(() => this._isLoading.set(false))
    );
  };

  createContactInfo = (
    data: CreateContactInfoPayload
  ): Observable<CreatedContactMessage> => {
    return this.api.createContactInfo(data).pipe(
      tap((res) => {
        this._contactInfo.update((current) => {
          if (!current) return null;
          return [...current, res.item];
        });
      }),
      finalize(() => this._isLoading.set(false))
    );
  };

  updateContactInfo = (
    data: UpdateContactInfoPayload
  ): Observable<CreatedContactMessage> => {
    this._isLoading.set(true);
    return this.api.updateContactInfo(data).pipe(
      tap((res) => {
        this._contactInfo.update((current) => {
          if (!current) return null;
          return current.map((item) =>
            item.id === res.item.id ? res.item : item
          );
        });
      }),
      finalize(() => this._isLoading.set(false))
    );
  };

  deleteContactInfo = (id: number): Observable<Message> => {
    this._isLoading.set(true);
    return this.api.deleteContactInfo(id).pipe(
      tap(() =>
        this._contactInfo.update((current) => {
          if (!current) return null;
          return current.filter((item) => item.id !== id);
        })
      ),
      finalize(() => this._isLoading.set(false))
    );
  };
}
