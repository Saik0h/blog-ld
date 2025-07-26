import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  tap,
  switchMap,
  catchError,
  throwError,
  filter,
  take,
} from 'rxjs';
import { AuthStoreService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RefreshService {
  private isRefreshing = false;
  private refreshSubject = new BehaviorSubject<boolean>(false);

  private authService: AuthStoreService = inject(AuthStoreService);

  public handle401<T>(retryRequest: () => Observable<T>): Observable<T> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshSubject.next(false);

      return this.authService.refresh().pipe(
        tap(() => {
          this.isRefreshing = false;
          this.refreshSubject.next(true);
        }),
        switchMap(() => retryRequest()),
        catchError((err) => {
          this.isRefreshing = false;
          this.refreshSubject.error(err);
          this.refreshSubject = new BehaviorSubject<boolean>(false);
          this.authService.forceLogout();
          return throwError(() => err);
        })
      );
    } else {
      return this.refreshSubject.pipe(
        filter((refreshed) => refreshed === true),
        take(1),
        switchMap(() => retryRequest())
      );
    }
  }
}
