import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-btn',
  imports: [RouterLink],
  templateUrl: './header-btn.component.html',
  styleUrl: './header-btn.component.scss',
})
export class HeaderBtnComponent {
  goTo = input('/');
  btnContent = signal('Ver currículo');
  btnClass = signal('btn header__btn');
}
