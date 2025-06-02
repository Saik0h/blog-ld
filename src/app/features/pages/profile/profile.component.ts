import { Component, inject, signal } from '@angular/core';
import { UserProfileCardComponent } from './ui/user-profile-card/user-profile-card.component';
import { AuthService } from '../../../core/services/auth.service';
import { Mail, User } from '../../../core/utils/types';
import { filter, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ProfileFeaturesCardComponent } from './ui/profile-features-card/profile-features-card.component';
import { InboxService } from '../../../core/services/inbox.service';
import { LoadingComponent } from '../shared/loading/loading.component';

@Component({
  selector: 'app-profile',
  imports: [UserProfileCardComponent, ProfileFeaturesCardComponent, LoadingComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  router = inject(Router);
  authService = inject(AuthService);
  user = signal<User>({
    firstname: '',
    id: '',
    lastname: '',
    profileImage: '',
    role: '',
    username: ''

  });
  private readonly mailService: InboxService = inject(InboxService);
  public readonly isLoading = signal(false)
  readonly unreadMails = signal<Mail[]>([])
  constructor() {
    this.isLoading.set(true)
    this.authService.getUser().subscribe({
      next: (user: User) => this.user.set(user),
      error: (err) => {
        this.isLoading.set(false)
        throwError(() => err)
      },
    });
    this.mailService.getAllMails().pipe(
      map((mails): Mail[] => mails.filter(mail => {
        mail.read === true
      }))
    ).subscribe({
      next: (res) => { this.unreadMails.set(res) },
      error: (err) => {
        this.isLoading.set(false)
        throwError(() => err)
      },
      complete: () => {this.isLoading.set(false)
        console.log(this.unreadMails())
      }
    })
  }

  logout = () => {
    this.authService.logout().subscribe({
      next: () => { this.router.navigate(['/']) }
    })
  }
}
