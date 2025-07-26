import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoadingComponent } from '../../../../shared/loading/loading.component';
import { PageNotFoundComponent } from '../../../../shared/page-not-found/page-not-found.component';
import { MailDetailService } from '../../../data-access/inbox-service/mail-detail.store.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-mail-detail',
  imports: [DatePipe, PageNotFoundComponent, LoadingComponent, RouterLink],
  templateUrl: './mail-detail.component.html',
  styleUrl: './mail-detail.component.css',
})
export class MailDetailComponent {
  private mailService = inject(MailDetailService);
  public readonly isLoading = this.mailService.isLoading;
  public readonly mail = this.mailService.mail;
  public readonly error = this.mailService.hasError;
  private readonly route = inject(ActivatedRoute);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.mailService.init(id);
  }

  deleteMail = () => {
    this.mailService.deleteMail().subscribe();
  };
}
