import { Component, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Mail } from '../../../../../../../core/utils/types';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  template: `<form class="search-bar" role="search">
    <input
      type="search"
      name="query"
      [(ngModel)]="query"
    />
  </form>`,
  styles: [`
  `],
})
export class SearchBarComponent {
  public readonly query = model<string>('');
  public readonly mails = signal<Mail[]>([]);
}
