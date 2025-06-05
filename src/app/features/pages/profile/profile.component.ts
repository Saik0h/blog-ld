import { Component, inject, signal } from '@angular/core';
import { UserProfileCardComponent } from './ui/user-profile-card/user-profile-card.component';
import { AuthService } from '../../../core/services/auth.service';
import { Mail, User } from '../../../core/utils/types';
import { map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { InboxService } from '../../../core/services/inbox.service';
import { LoadingComponent } from '../shared/loading/loading.component';
import { InboxWidgetComponent } from './ui/inbox-widget/inbox-widget.component';
import { PostFormComponent } from './ui/post-form/post-form.component';

@Component({
  selector: 'app-profile',
  imports: [UserProfileCardComponent, LoadingComponent, InboxWidgetComponent, PostFormComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  public readonly isLoading = signal(false)
  private authService = inject(AuthService);
  private router = inject(Router);
  readonly user = signal<User | null>(null);


  constructor() {
    this.isLoading.set(true)

    this.authService.getUser().subscribe({
      next: (user: User) => {
        this.user.set(user)
      }, error: (err) => {
        this.isLoading.set(false)
        throwError(() => err)
      }, complete: () => {
        this.isLoading.set(false)
      }
    })
  }
  
  logout = () => {
    this.authService.logout().subscribe({
      error: (err) => throwError(() => err),
      complete: () => this.router.navigate(['/'])
    })
  }
}
