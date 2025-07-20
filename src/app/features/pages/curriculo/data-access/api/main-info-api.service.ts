import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  CurriculumCreatePayload,
  Message,
  Curriculum,
  CurriculumUpdatePayload,
} from '../../../../../core/utils/types';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MainInfoApiService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.apiUrl + '/curriculum';

  public createCurriculum(data: CurriculumCreatePayload): Observable<Message> {
    return this.http.post<Message>(this.url, data, {
      withCredentials: true,
    });
  }

  public getCurriculum(): Observable<Curriculum> {
    return this.http.get<Curriculum>(this.url);
  }

  public updateCurriculum(data: CurriculumUpdatePayload): Observable<Message> {
    return this.http.patch<Message>(this.url, data, {
      withCredentials: true,
    });
  }

  public deleteCurriculum(): Observable<Message> {
    return this.http.delete<Message>(this.url, {
      withCredentials: true,
    });
  }
}
