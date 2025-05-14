import { Component, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { LoginPayload } from '../../../core/types/types';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  providers: [AuthService, NgForm],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = signal('');
  password = signal('');
  error = signal('');

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const payload: LoginPayload = {
      username: this.username(),
      password: this.password(),
    };

    this.authService.login(payload).subscribe({
      next: (tokens) => {
        localStorage.setItem('token', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);

        // Redirecionar após login bem-sucedido
        this.router.navigate(['/perfil'])
      },
      error: (err) => {
        const error = signal(this.error);
        error().set(err.error.message);
        console.error('Erro de login:', err);
      },
    });
  }
}
