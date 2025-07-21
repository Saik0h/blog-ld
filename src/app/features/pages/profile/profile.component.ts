import { Component, inject, OnInit, signal } from '@angular/core';
import { UserProfileCardComponent } from './ui/user-profile-card/user-profile-card.component';
import { AuthService } from '../../../core/services/auth.service';
import { faqPayload } from '../../../core/utils/types';
import { LoadingComponent } from '../shared/loading/loading.component';
import { InboxWidgetComponent } from './ui/inbox-widget/inbox-widget.component';
import { FaqInputComponent } from './ui/faq-input/faq-input.component';
import { NewPostComponent } from './ui/new-post/new-post.component';
import { FaqStoreProfileService } from './data-access/faq-service/profile-faq-store.service';

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
  private faqService = inject(FaqStoreProfileService);

  public user = this.authService.user;
  public readonly faqs = this.faqService.faqs;
  public readonly faqsError = this.faqService.hasError;
  public readonly authError = this.authService.hasError;
  public readonly faqsLoading = this.faqService.isLoading;
  public readonly userLoading = this.authService.isLoading;

  ngOnInit() {
    this.authService.getUser().subscribe();
    this.faqService.initialize();
  }

  createFaq = (data: faqPayload) => {
    this.faqService.createFaq(data);
  };

  deleteFaq = (id: number) => {
    return this.faqService.deleteFaq(id);
  };

  logout = () => {
    this.authService.logout().subscribe();
  };
}
