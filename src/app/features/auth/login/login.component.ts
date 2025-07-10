import { Component, Inject, inject, model, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { LoginPayload } from '../../../core/utils/types';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { GlobalLoadingComponent } from "../../pages/shared/global-loading/global-loading.component";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, GlobalLoadingComponent],
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
  isLoading = this.authService.isLoading()
  error = this.authService.hasError()

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
