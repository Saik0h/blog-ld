import { Component, inject, signal } from '@angular/core';
import { RegisterPayload } from '../../core/utils/types';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [],
  providers: [AuthService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  firstname = signal('');
  lastname = signal('');
  username = signal('');
  password = signal('');
  error = signal('');

  private authService = inject(AuthService);
  private router = inject(Router);

  onRegister() {
    const payload: RegisterPayload = {
      firstname: this.firstname(),
      lastname: this.lastname(),
      username: this.username(),
      password: this.password(),
    };

    this.authService.register(payload).subscribe({
      next: (tokens) => {
        localStorage.setItem('token', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);

        // Redirecionar após login bem-sucedido
        this.router.navigate(['/perfil']);
      },
      error: (err) => {
        const error = signal(this.error);
        error().set(err.error.message);
        console.error('Erro ao registrar usuário:', err);
      },
    });
  }
}
