import { Component, signal, model, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Mail } from '../../../../../../core/utils/types';
import { MailCardComponent } from '../../mail-card/mail-card.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { InboxStoreService } from '../../../data-access/inbox-service/inbox-store.service';

@Component({
  selector: 'app-mail-list',
  imports: [SearchBarComponent, MailCardComponent],
  templateUrl: './mail-list.component.html',
  styleUrl: './mail-list.component.css',
})
export class MailListComponent {
  public readonly isLoading = signal<boolean>(true);
  public readonly mails = signal<Mail[]>([]);
  public readonly query = model<string>('');
  private readonly mailService = inject(InboxStoreService);
  router = inject(Router);
  constructor() {
    this.mailService.searchMails(this.query().trim()).subscribe({
      next: (res: Mail[]) => this.mails.set(res),
      complete: () => this.isLoading.set(false),
    });
  }
  redirect = (id: string) => this.router.navigate(['/profile/inbox/' + id]);
}
