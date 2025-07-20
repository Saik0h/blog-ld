import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-widget',
  imports: [RouterLink],
  templateUrl: './user-widget.component.html',
  styleUrl: './user-widget.component.css',
})
export class UserWidgetComponent implements OnInit {
  private readonly authService = inject(AuthService);
  public readonly user = this.authService.user;
  public readonly isUserLoggedIn = this.authService.isLoggedIn;
  
  ngOnInit() {
   this.authService.initialize()
  }

  logout() {
   this.authService.logout().subscribe() 
  }
}
