import { Component, Inject, inject, model, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { LoginPayload } from '../../../core/utils/types';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  providers: [AuthService, NgForm],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  onSubmit() {
    const payload: LoginPayload = this.loginForm.value as LoginPayload;
    this.authService.login(payload).subscribe({
      error: (err) => throwError(() => err),
      complete: () => {
        this.router.navigate(['profile']);
      },
    });
  }
}
