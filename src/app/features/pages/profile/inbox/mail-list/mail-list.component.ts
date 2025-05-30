import { Component, effect, inject, model, signal } from '@angular/core';
import { Mail } from '../../../../../core/utils/types';
import { InboxService } from '../../../../../core/services/inbox.service';
import { DatePipe } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-mail-list',
  imports: [DatePipe, SearchBarComponent],
  templateUrl: './mail-list.component.html',
  styleUrl: './mail-list.component.css',
})
export class MailListComponent {
  public readonly isLoading = signal<boolean>(true)
  public readonly mails = signal<Mail[]>([]);
  public readonly query = model<string>('')
  private readonly mailService = inject(InboxService);

  constructor() {
    console.log(this.isLoading())
    this.mailService.searchMails(this.query().trim()).subscribe({
      next: (res: Mail[]) => this.mails.set(res),
      complete: () => this.isLoading.set(false)
    })
  }


}
