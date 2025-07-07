import { Component, inject, signal } from '@angular/core';
import { FaqService } from '../../../../../core/services/faq.service';
import { faq, faqDisplay } from '../../../../../core/utils/types';
import { map, throwError } from 'rxjs';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { ResourceEmptyComponent } from '../../../shared/resource-empty/resource-empty.component';
import { RecursoTemporariamenteIndisponivelComponent } from '../../../shared/recurso-temporariamente-indisponivel/recurso-temporariamente-indisponivel.component';

@Component({
  selector: 'app-faq',
  imports: [
    LoadingComponent,
    ResourceEmptyComponent,
    RecursoTemporariamenteIndisponivelComponent,
  ],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
})
export class FaqComponent {
  private readonly faqService = inject(FaqService);
  readonly isLoading = this.faqService.isLoading();
  faqs = signal<faqDisplay[] | null>(null);
  error = this.faqService.hasError();
  constructor() {
    this.faqService
      .getAllFaqs()
      .pipe(
        map((faqs): faqDisplay[] =>
          faqs.map((newFaq) => {
            return {
              ...newFaq,
              open: false,
            };
          })
        )
      )
      .subscribe({
        next: (res: faq[]) => {
          this.faqs.set(res as faqDisplay[]);
        },
      });
  }
  toggle(item: any) {
    item.open = !item.open;
  }
}
