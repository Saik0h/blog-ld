import { inject, Injectable, signal } from '@angular/core';
import { FaqApiService } from './faq-api.service';
import { map, tap, finalize } from 'rxjs';
import { faqDisplay, faqPayload } from '../../../../core/utils/types';

@Injectable({
  providedIn: 'root',
})
export class FaqStoreHomepageService {
  api = inject(FaqApiService);

  private _hasError = signal<boolean>(false);
  private _isLoading = signal<boolean>(false);

  public faqs = signal<faqDisplay[] | null>(null);
  public isLoading = this._isLoading.asReadonly();
  public hasError = this._hasError.asReadonly();

  initialize(): void {
    this._isLoading.set(true);

    this.api
      .getAllFaqs()
      .pipe(
        map((faqs): faqDisplay[] =>
          faqs.map((faq) => ({
            ...faq,
            open: false,
          }))
        ),
        tap((faqs) => this.faqs.set(faqs)),
        finalize(() => this._isLoading.set(false))
      )
      .subscribe();
  }

  deleteFaq(id: number): void {
    this._isLoading.set(true);
    this.api
      .deleteFaq(id)
      .pipe(
        tap(() => this.initialize()),
        finalize(() => this._isLoading.set(false))
      )
      .subscribe();
  }
}
