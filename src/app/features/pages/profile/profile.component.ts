import { Component, inject, OnInit, signal } from '@angular/core';
import { UserProfileCardComponent } from './ui/user-profile-card/user-profile-card.component';
import { AuthService } from '../../../core/services/auth.service';
import { faq, faqPayload, User } from '../../../core/utils/types';
import { firstValueFrom, lastValueFrom, throwError } from 'rxjs';
import { LoadingComponent } from '../shared/loading/loading.component';
import { InboxWidgetComponent } from './ui/inbox-widget/inbox-widget.component';
import { FaqInputComponent } from './faq-input/faq-input.component';
import { FaqService } from '../../../core/services/faq.service';
import { NewPostComponent } from './new-post/new-post.component';

@Component({
  selector: 'app-profile',
  imports: [
    UserProfileCardComponent,
    LoadingComponent,
    InboxWidgetComponent,
    FaqInputComponent,
    NewPostComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  authService = inject(AuthService);
  private faqService = inject(FaqService);

  public user = this.authService.user;
  public readonly faqs = this.faqService.faqs;
  public readonly faqsError = this.faqService.hasError;
  public readonly authError = this.authService.hasError;
  public readonly faqsLoading = this.faqService.isLoading;
  public readonly userLoading = this.authService.isLoading;

  ngOnInit() {
    this.authService.getUser().subscribe();
    this.faqService.getAllFaqs().subscribe();
  }

  createFaq = (data: faqPayload) => {
    this.faqService.postFaq(data).subscribe();
  };

  deleteFaq = (id: number) => {
    return this.faqService.deleteFaq(id).subscribe();
  };

  logout = () => {
    this.authService.logout().subscribe()
  };
}
