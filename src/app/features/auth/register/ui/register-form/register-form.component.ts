import { Component, Input, signal } from '@angular/core';
import { RegisterPayload } from '../../../../../core/utils/types';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  imports: [FormsModule],
  providers: [FormsModule, NgForm],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  error = signal('');
  firstname = signal('');
  lastname = signal('');
  username = signal('');
  password = signal('');
  confirm_password = signal('');

  @Input() register = (payload: RegisterPayload) => {};

  submit() {
    const payload: RegisterPayload = {
      firstname: this.firstname(),
      lastname: this.lastname(),
      username: this.username(),
      password: this.password(),
    };
    if (this.password() !== this.confirm_password()) {
      console.log(payload, this.confirm_password());
      return this.error.set('Senha must match');
    } else {
      return this.register(payload);
    }
  }
}
