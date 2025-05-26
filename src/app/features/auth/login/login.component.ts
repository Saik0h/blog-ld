import { Component, Inject, inject, model, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { LoginPayload } from '../../../core/utils/types';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  providers: [AuthService, NgForm],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginData: LoginPayload = {
    username: '',
    password: ''
  };

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  onSubmit() {
    this.authService.login(this.loginData).subscribe({
      next: () => {
        this.router.navigate(['/profile']);
      },
      error: err => {
        throwError(() => { err })
      }
    });
  }
}