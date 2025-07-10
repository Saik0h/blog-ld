import { Component, inject, signal } from '@angular/core';
import { InboxService } from '../../../../../core/services/inbox.service';
import { Mail } from '../../../../../core/utils/types';
import { MailCardComponent } from '../mail-card/mail-card.component';
import { ResourceEmptyComponent } from '../../../shared/resource-empty/resource-empty.component';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inbox-widget',
  imports: [MailCardComponent, ResourceEmptyComponent, LoadingComponent],
  templateUrl: './inbox-widget.component.html',
  styleUrl: './inbox-widget.component.css',
})
export class InboxWidgetComponent {
  mailService = inject(InboxService);
  mails = signal<Mail[] | null>(null);
  readonly isLoading = this.mailService.isLoading();
  readonly error = this.mailService.hasError();
  router = inject(Router);
  constructor() {
    this.mailService.getAllUnreadMails().subscribe({
      next: (res: Mail[]) => {
         this.mails.set(res);
      },
    });
  }

  moveToPage = (id: string) => {
    this.router.navigate(['/profile/inbox/' + id]);
  };
}
