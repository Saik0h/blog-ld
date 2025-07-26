import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthStoreService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-user-widget',
  imports: [RouterLink],
  templateUrl: './user-widget.component.html',
  styleUrl: './user-widget.component.css',
})
export class UserWidgetComponent implements OnInit {
  private readonly authService = inject(AuthStoreService);
  public readonly user = this.authService.user;
  public readonly isUserLoggedIn = this.authService.isLoggedIn;

  ngOnInit() {
    this.authService.initialize();
  }

  logout() {
    this.authService.logout().subscribe();
  }
}
