import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  imports: [],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  faqs = [
    {
      question: 'Lorem ipsum?',
      answer: 'dolor sit amet consectetur adipisicing elit. Vitae sed accusantium doloribus, facilis animi necessitatibus distinctio mollitia odit nobis officiis temporibus maxime adipisci libero ex voluptates incidunt quod esse saepe!',
      open: false
    }
  ];

  toggle(item: any) {
    item.open = !item.open;
  }
}
