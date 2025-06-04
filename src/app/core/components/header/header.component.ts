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
  url = signal('/logo.png');
  btnText = 'Ver Currículo';
  btnGoTo = 'curriculo';
  headerLinks = signal([
    { label: 'Artigos', path: '/artigos' },
    { label: 'Blog', path: '/blogs' },
    { label: 'Contato', path: '/contato' },
  ]);
}
