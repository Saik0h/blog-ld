import { Component, inject, signal } from '@angular/core';
import { RegisterPayload } from '../../../core/utils/types';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { tap, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  providers: [AuthService, NgForm],
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

  onchangeFirstname() {
    console.log(this.firstname());
  }

  onRegister() {
    const payload: RegisterPayload = {
      firstname: this.firstname(),
      lastname: this.lastname(),
      username: this.username(),
      password: this.password(),
    };

    console.log(payload);

    this.authService.register(payload).pipe(
      tap(() => {
        this.router.navigate(['/perfil']);
      }),
      catchError((err) => {
        const error = signal(this.error);
        error().set(err.error.message);
        console.error('Erro de registro:', err);
        return throwError(() => err);
      })
    );
  }
}
