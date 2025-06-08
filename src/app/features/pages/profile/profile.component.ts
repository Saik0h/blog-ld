import { Component, inject, signal } from '@angular/core';
import { UserProfileCardComponent } from './ui/user-profile-card/user-profile-card.component';
import { AuthService } from '../../../core/services/auth.service';
import { faq, faqPayload, User } from '../../../core/utils/types';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoadingComponent } from '../shared/loading/loading.component';
import { InboxWidgetComponent } from './ui/inbox-widget/inbox-widget.component';
import { PostFormComponent } from './ui/post-form/post-form.component';
import { FaqInputComponent } from './faq-input/faq-input.component';
import { FaqService } from '../../../core/services/faq.service';
import { ImageService } from '../../../core/services/image.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-profile',
  imports: [
    UserProfileCardComponent,
    LoadingComponent,
    InboxWidgetComponent,
    PostFormComponent,
    FaqInputComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  public readonly isLoading = signal(false);
  private authService = inject(AuthService);
  private router = inject(Router);
  readonly user = signal<User | null>(null);
  private userService = inject(UserService);
  faqService = inject(FaqService);
  faqs = signal<faq[]>([]);
  imageService = inject(ImageService);
  
  
  constructor() {
    this.isLoading.set(true);

    this.faqService.getAllFaqs().subscribe({
      next: (faqs) => this.faqs.set(faqs),
      error: (err) => throwError(() => err),
    });

    this.authService.getUser().subscribe({
      next: (user: User) => {
        this.user.set(user);
      },
      error: (err) => {
        this.isLoading.set(false);
        throwError(() => err);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  createFaq = (data: faqPayload) => {
    this.faqService.postFaq(data).subscribe({
      error: (err) => throwError(() => err),
    });
  };

  deleteFaq = (id: number) => {
    this.faqService.deleteFaq(id).subscribe({
      error: (err) => throwError(() => err),
    });
  };

  logout = () => {
    this.authService.logout().subscribe({
      error: (err) => throwError(() => err),
      complete: () => this.router.navigate(['/']),
    });
  };
}
