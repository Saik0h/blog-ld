import { Component, inject, model, signal } from '@angular/core';
import { InboxService } from '../../../../../../core/services/inbox.service';
import { FormsModule } from '@angular/forms';
import { Mail } from '../../../../../../core/utils/types';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  template: `<form class="search-bar" role="search">
    <input
      type="search"
      (ngModelChange)="onChange()"
      name="query"
      [(ngModel)]="query"
    />
  </form>`,
  styles: './search-bar.component.css',
})
export class SearchBarComponent {
  private mailService = inject(InboxService);
  public readonly query = model<string>('');
  public readonly mails = signal<Mail[]>([]);
  onChange() {
    this.mailService.searchMails(this.query()).subscribe({
      next: (mails: Mail[]) => this.mails.set(mails),
      complete: () => console.log(this.mails()),
    });
  }
}
