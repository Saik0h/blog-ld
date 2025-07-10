import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../shared/button.component';
import { HamburgerMenuComponent } from '../menu-hamburger/menu-hamburguer.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, ButtonComponent, HamburgerMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  url = 'logo.webp';
  btnText = 'Contato';
  altText = 'Olá'
  btnGoTo = 'contato';
  headerLinks = signal([
    { label: 'Artigos', path: '/artigos' },
    { label: 'Blog', path: '/blogs' },
    { label: 'Materiais Gratuitos', path: '/materiais' },
    { label: 'Cursos', path: '/cursos' },
    { label: 'Curriculo', path: '/curriculo' },
  ]);
}
