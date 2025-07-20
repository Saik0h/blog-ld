import { inject, Injectable, signal } from '@angular/core';
import { MainInfoApiService } from '../api/main-info-api.service';
import {
  Curriculum,
  CurriculumCreatePayload,
  CurriculumUpdatePayload,
  Message,
} from '../../../../../core/utils/types';
import { Observable, tap, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainInfoStoreService {
  private readonly api = inject(MainInfoApiService);

  private _curriculumInfo = signal<Curriculum | null>(null);
  public readonly curriculumInfo = this._curriculumInfo.asReadonly();

  private _isLoading = signal(false);
  public readonly isLoading = this._isLoading.asReadonly();

  public initialize(): void {
    this.getCurriculumInfo().subscribe();
  }

  getCurriculumInfo(): Observable<Curriculum> {
    this._isLoading.set(true);
    return this.api.getCurriculum().pipe(
      tap((curriculumInfo) => this._curriculumInfo.set(curriculumInfo)),
      finalize(() => this._isLoading.set(false))
    );
  }

  createCurriculumInfoInfo(data: CurriculumCreatePayload): Observable<Message> {
    this._isLoading.set(true);
    return this.api.createCurriculum(data).pipe(
      tap(() => this.getCurriculumInfo().subscribe()),
      finalize(() => this._isLoading.set(false))
    );
  }

  updateCurriculumInfo(data: CurriculumUpdatePayload): Observable<Message> {
    this._isLoading.set(true);
    return this.api.updateCurriculum(data).pipe(
      tap(() => {
        this.getCurriculumInfo().subscribe();
      }),
      finalize(() => this._isLoading.set(false))
    );
  }

  deleteCurriculumInfoInfo(): Observable<Message> {
    this._isLoading.set(true);
    return this.api.deleteCurriculum().pipe(
      tap(() => this._curriculumInfo.set(null)),
      finalize(() => this._isLoading.set(false))
    );
  }
}
