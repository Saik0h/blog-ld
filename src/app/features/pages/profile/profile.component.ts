import { Component, inject, signal } from '@angular/core';
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
export class ProfileComponent {
  authService = inject(AuthService);
  public user = signal<User | null>(null);
  private faqService = inject(FaqService);
  public readonly faqs = signal<faq[]>([]);
  public readonly faqsError = this.faqService.hasError();
  public readonly authError = this.authService.hasError();
  public readonly faqsLoading = this.faqService.isLoading();
  public readonly userLoading = this.authService.isLoading();

  constructor() {
    this.authService.getUser().subscribe({
      next: (user: User) => this.user.set(user),
    });

    this.faqService.getAllFaqs().subscribe({
      next: (faqs) => this.faqs.set(faqs),
    });
  }

  createFaq = (data: faqPayload) => {
    this.faqService.postFaq(data).subscribe({
      error: (err) => throwError(() => err),
    });
  };

  deleteFaq = (id: number) => {
    return this.faqService.deleteFaq(id);
  };

  logout = () => {
    firstValueFrom(this.authService.logout());
  };
}
