import { Component, Input, signal } from '@angular/core';
import { faqDisplay, faqPayload } from '../../../../core/utils/types';

@Component({
  selector: 'app-faq-input',
  imports: [],
  templateUrl: './faq-input.component.html',
  styleUrl: './faq-input.component.css',
})
export class FaqInputComponent {
  @Input({ required: true }) postNewFaq = (data: faqPayload) => {};
  @Input({ required: true }) deleteFaq = (id: number) => {};
  @Input({ required: true }) faqs = signal<faqDisplay[]>([]);
  newFaq: faqPayload = {
    question: '',
    answer: '',
  };
  isFormOpen = signal<boolean>(false);
  isListOpen = signal<boolean>(false);
  
  postFaq(event: Event) {
    event.preventDefault();
    this.postNewFaq(this.newFaq);
  }
}
