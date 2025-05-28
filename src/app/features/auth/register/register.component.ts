import { Component, inject } from '@angular/core';
import { RegisterPayload } from '../../../core/utils/types';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  providers: [AuthService, NgForm],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData: RegisterPayload = {
    firstname: '',
    lastname: '',
    username: '',
    password: ''
  };

  private authService: AuthService = inject(AuthService)
  private router: Router = inject(Router);

  onSubmit() {
    this.authService.register(this.registerData).subscribe({
      next: () => {
        console.log('Registro bem-sucedido!', this.registerData);
        this.router.navigate(['/perfil']);
      },
      error: err => throwError(() => { err }),
    });
  }
}