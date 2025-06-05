import { Component, inject, signal } from '@angular/core';
import { InboxService } from '../../../../../core/services/inbox.service';
import { map, tap, throwError } from 'rxjs';
import { Mail } from '../../../../../core/utils/types';
import { MailCardComponent } from '../mail-card/mail-card.component';
import { ResourceEmptyComponent } from '../../../shared/resource-empty/resource-empty.component';
import { LoadingComponent } from '../../../shared/loading/loading.component';

@Component({
  selector: 'app-inbox-widget',
  imports: [MailCardComponent, ResourceEmptyComponent, LoadingComponent],
  templateUrl: './inbox-widget.component.html',
  styleUrl: './inbox-widget.component.css'
})
export class InboxWidgetComponent {
  mailService = inject(InboxService);
  mails = signal<Mail[] | null>(null)
  readonly isLoading = signal(false)

  constructor() {
    this.isLoading.set(true)
    this.mailService.getAllMails().pipe(
      map((mails): Mail[] => {
        return mails.filter((mail: Mail) => {
          return mail.read === false
        })
      })
    ).subscribe({
      next: (res: Mail[]) => {
        this.mails.set(res)
      }, error: (err) => {
        this.isLoading.set(false)
        throwError(() => err)
      },
      complete: () => {
        this.isLoading.set(false);
      },
    })
  }
}
