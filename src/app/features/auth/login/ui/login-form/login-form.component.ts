import { Component, Input, model } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [RouterLink, FormsModule],
  providers: [NgForm],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  username = model<string>('');
  password = model<string>('');
  
  @Input() onLogin!: () => void;

  submit(): void {
      return this.onLogin();
  }
}
