import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../shared/button.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  title = signal('Website Logo');
  btnText = 'Ver Currículo';
  btnGoTo = 'curriculo';
}
