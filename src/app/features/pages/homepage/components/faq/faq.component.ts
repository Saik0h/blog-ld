import { Component, inject, OnInit } from '@angular/core';
import { faqDisplay } from '../../../../../core/utils/types';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { ResourceEmptyComponent } from '../../../shared/resource-empty/resource-empty.component';
import { UnavailableResourceComponent } from '../../../shared/resource-temporarily-unavailable/unavailable-resource.component';
import { FaqStoreHomepageService } from '../../data-access/faq-store.service';

@Component({
  selector: 'app-faq',
  imports: [
    LoadingComponent,
    ResourceEmptyComponent,
    UnavailableResourceComponent,
  ],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
})
export class FaqComponent implements OnInit {
  private readonly faqService = inject(FaqStoreHomepageService);
  readonly isLoading = this.faqService.isLoading;
  public readonly error = this.faqService.hasError;
  public faqs = this.faqService.faqs;

  ngOnInit() {
    this.faqService.initialize();
  }

  toggle(item: faqDisplay) {
    this.faqs.update((list) =>
      list.map((faq) => (faq === item ? { ...faq, open: !faq.open } : faq))
    );
  }
}
