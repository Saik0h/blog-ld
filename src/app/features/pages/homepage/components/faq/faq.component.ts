import { Component, inject, OnInit, signal } from '@angular/core';
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
export class FaqComponent implements OnInit {
  private readonly faqService = inject(FaqService);
  readonly isLoading = this.faqService.isLoading;
  public readonly error = this.faqService.hasError;
  public faqs = this.faqService.faqs;

  ngOnInit() {
    this.faqService.getAllFaqs();
  }

  toggle(item: faqDisplay) {
    this.faqs.update((list) =>
      list.map((faq) => (faq === item ? { ...faq, open: !faq.open } : faq))
    );
  }
}
