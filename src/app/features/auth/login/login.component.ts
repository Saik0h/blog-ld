import { Component, Inject, inject, model, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { LoginPayload } from '../../../core/utils/types';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { throwError } from 'rxjs';

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
      error: (err) => throwError(() => err),
      complete: () => {
        this.router.navigate(['profile'])
        this.loginData = {
          username: '',
          password: ''
        }
      }
    })
  }
}