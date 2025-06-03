import { Component, inject, signal } from '@angular/core';
import { FaqService } from '../../../../../core/services/faq.service';
import { faq, faqDisplay } from '../../../../../core/utils/types';
import { map, throwError } from 'rxjs';
import { LoadingComponent } from '../../../shared/loading/loading.component';

@Component({
  selector: 'app-faq',
  imports: [LoadingComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  private readonly faqService = inject(FaqService)
  readonly isLoading = signal(false)
  faqs = signal<faqDisplay[] | null>(null);
  constructor() {
    this.isLoading.set(true)
    this.faqService.getAllFaqs().pipe(
      map((faqs): faqDisplay[] => faqs.map(newFaq => {
        return {
          ...newFaq,
          open: false
        }
      }))
    ).subscribe({
      next: (res: faq[]) => {
        this.faqs.set(res as faqDisplay[])
      }, error: (err) => {
        this.isLoading.set(false)
        throwError(() => err)
      },
      complete: () => {
        this.isLoading.set(false)
      }
    })
  }
  toggle(item: any) {
    item.open = !item.open;
  }
}
