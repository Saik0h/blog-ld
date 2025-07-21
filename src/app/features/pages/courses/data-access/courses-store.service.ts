import { inject, Injectable, signal } from '@angular/core';
import { CoursesApiService } from './courses-api.service';
import { Course } from '../../../../core/utils/types';
import { tap, catchError, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesStoreService {
  private readonly api = inject(CoursesApiService);

  private _isLoading = signal<boolean>(false);
  private _hasError = signal<boolean>(false);
  private _courses = signal<Course[] | null>(null);

  public isLoading = this._isLoading.asReadonly();
  public hasError = this._hasError.asReadonly();
  public courses = this._courses.asReadonly();

  initialize = (): void => {
    this._isLoading.set(true);
    this.api
      .getAllCourses()
      .pipe(
        tap((courses) => this._courses.set(courses)),
        finalize(() => this._isLoading.set(false))
      )
      .subscribe();
  };

  delete(id: number) {
    return this.api
      .delete(id)
      .pipe(tap(() => this.initialize()))
      .subscribe();
  }
}
