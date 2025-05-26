import { Component, inject, Input, input, model, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginPayload } from '../../../../../core/utils/types';

@Component({
  selector: 'app-login-form',
  imports: [RouterLink, FormsModule],
  providers: [NgForm],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  username = signal<string>('');
  password = signal<string>('');

  @Input() submit = (payload: LoginPayload) => {}; 

  login() {
    return this.submit({
      username: this.username(),
      password: this.password(),
    });
  }
}
