import { Component, inject } from '@angular/core';
import { LoginPayload } from '../../../core/utils/types';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthStoreService } from '../../../core/services/auth/auth.service';
import { LoadingComponent } from '../../pages/shared/loading/loading.component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, LoadingComponent],
  providers: [AuthStoreService, NgForm],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  private authService: AuthStoreService = inject(AuthStoreService);
  public readonly isLoading = this.authService.isLoading;
  public readonly error = this.authService.hasError;
  public readonly errorMessage = this.authService.message;

  onSubmit() {
    const payload: LoginPayload = this.loginForm.value as LoginPayload;
    this.authService.login(payload).subscribe();
  }
}
