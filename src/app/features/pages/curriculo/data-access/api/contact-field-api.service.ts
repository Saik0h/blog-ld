import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment.development';
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
export class ContactFieldApiService {
  private http = inject(HttpClient);
  private readonly url = environment.apiUrl + '/curriculum/contact';

  getContactItems(): Observable<ContactInfo[]> {
    return this.http.get<ContactInfo[]>(this.url, { withCredentials: true });
  }

  createContactInfo(data: CreateContactInfoPayload) {
    return this.http.post<CreatedContactMessage>(this.url, data, {
      withCredentials: true,
    });
  }

  updateContactInfo(data: UpdateContactInfoPayload) {
    return this.http.patch<CreatedContactMessage>(
      `${this.url}/contact/${data.id}`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  deleteContactInfo(id: number): Observable<Message> {
    return this.http.delete<Message>(`${this.url}/${id}`, {
      withCredentials: true,
    });
  }
}
