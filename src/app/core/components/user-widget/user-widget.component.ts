import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../utils/types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-widget',
  imports: [RouterLink],
  templateUrl: './user-widget.component.html',
  styleUrl: './user-widget.component.css',
})
export class UserWidgetComponent {
  isUserLoggedIn = false;
  authService = inject(AuthService);
  userService = inject(UserService);
  userData: User | null = null;
 
  constructor() {
    this.authService.status().subscribe({
      next: (status) => {
        this.isUserLoggedIn = status;
      },
      error: (err) => {
        console.error('Error checking user status:', err);
      },
    });

    if (this.isUserLoggedIn) {
      this.userService.getMe().subscribe({
        next: (user) => {
          console.log('User data:', user);
        },
        error: (err) => {
          console.error('Error fetching user data:', err);
        },
      });
    }
  }

  logout() {
    this.userService.logout().subscribe({
      next: (response) => {
        console.log('Logout successful:', response);
        this.isUserLoggedIn = false;
        this.userData = null;
      },
      error: (err) => {
        console.error('Error during logout:', err);
      },
    });
  }
}
