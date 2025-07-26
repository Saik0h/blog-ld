import { Component, inject, OnInit } from '@angular/core';
import { MailCardComponent } from '../mail-card/mail-card.component';
import { ResourceEmptyComponent } from '../../../shared/resource-empty/resource-empty.component';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { Router } from '@angular/router';
import { InboxStoreService } from '../../data-access/inbox-service/inbox-store.service';
import { UnavailableResourceComponent } from '../../../shared/resource-temporarily-unavailable/unavailable-resource.component';

@Component({
  selector: 'app-inbox-widget',
  imports: [
    MailCardComponent,
    ResourceEmptyComponent,
    LoadingComponent,
    UnavailableResourceComponent,
  ],
  templateUrl: './inbox-widget.component.html',
  styleUrl: './inbox-widget.component.css',
})
export class InboxWidgetComponent implements OnInit {
  private readonly mailService = inject(InboxStoreService);
  public readonly mails = this.mailService.unreadMails;
  readonly isLoading = this.mailService.isLoading;
  readonly error = this.mailService.hasError;
  private readonly router = inject(Router);

  ngOnInit() {
    this.mailService.getAllUnreadMails().subscribe();
  }

  moveToPage = (id: string) => {
    this.router.navigate(['/profile/inbox/' + id]);
  };
}
