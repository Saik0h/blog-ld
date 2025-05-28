import { Component, inject, signal } from '@angular/core';
import { Mail } from '../../../../../core/utils/types';
import { InboxService } from '../../../../../core/services/inbox.service';
import { DatePipe } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';

@Component({
  selector: 'app-mail-list',
  imports: [DatePipe, SearchBarComponent],
  templateUrl: './mail-list.component.html',
  styleUrl: './mail-list.component.css',
})
export class MailListComponent {
  private readonly mailService = inject(InboxService);
  public readonly mails = signal<Mail[]>([]);
  public readonly isLoading = signal<boolean>(true)

  ngOnInit() {
    this.mailService.getAllMails().subscribe({
      next: (mails: Mail[]) => this.mails.set(mails),
    });
  }
}
