import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { User } from '../../utils/types';

@Component({
  selector: 'app-user-widget',
  imports: [RouterLink],
  templateUrl: './user-widget.component.html',
  styleUrl: './user-widget.component.css',
})
export class UserWidgetComponent {
  authService = inject(AuthService);
  user = signal<User | null>(null);
  isUserLoggedIn = this.authService.isLoggedIn();
  constructor() {
    if (this.isUserLoggedIn()) {
      this.authService.getUser().subscribe({
        next: (user: User) => this.user.set(user),
      });
    }
  }
  
  async logout() {
    await firstValueFrom(this.authService.logout());
  }
}
