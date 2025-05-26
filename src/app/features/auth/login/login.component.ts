import { Component, Inject, inject, model, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { LoginPayload } from '../../../core/utils/types';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './ui/login-form/login-form.component';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, LoginFormComponent],
  providers: [AuthService, NgForm],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = signal('');
  password = signal('');
  error = signal('');
  private router = inject(Router);
  private authService = inject(AuthService);

  onLogin = (payload: LoginPayload) => {
    console.log(payload)

    this.authService.login(payload).subscribe({
      error: (err) => {
        const error = signal(this.error);
        error().set(err.error.message);
        console.error('Erro de login:', err);
      },
      complete: () => this.router.navigate(['perfil']),
    });
  };
}
