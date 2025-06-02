import { Component, effect, inject, model, signal } from '@angular/core';
import { Mail } from '../../../../../core/utils/types';
import { InboxService } from '../../../../../core/services/inbox.service';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MailCardComponent } from '../../ui/mail-card/mail-card.component';
import { Router } from '@angular/router';

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
  private readonly mailService = inject(InboxService);
  router = inject(Router);
  constructor() {
    this.mailService.searchMails(this.query().trim()).subscribe({
      next: (res: Mail[]) => this.mails.set(res),
      complete: () => this.isLoading.set(false),
    });
  }

  redirect = (id: string) => this.router.navigate(['/profile/inbox/' + id]);
}
