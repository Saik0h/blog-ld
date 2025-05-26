import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  providers: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  currentYear = signal<string>(new Date().getFullYear().toString());
  developedBy = signal<string>('Desenvolvido por: Cristhyan Magarão');

  socialsNavLinks = signal<{ label: string; url: string; icon: string }[]>([
    {
      label: 'Instagram',
      url: 'https://www.instagram.com/dra.laisdonida/',
      icon: 'bi bi-instagram',
    },
    {
      label: 'Whatsapp',
      url: 'https://wa.me/5548988570407',
      icon: 'bi bi-whatsapp',
    },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/lais-donida-85b57355/',
      icon: 'bi bi-linkedin',
    },
  ]);

  internalNavLinks = signal<{ label: string; url: string; icon: string }[]>([
    { label: 'Sobre', url: '/sobre', icon: 'bi bi-info-circle' },
    { label: 'Contato', url: '/contato', icon: 'bi bi-envelope' },
    { label: 'Termos de Uso', url: '/', icon: 'bi bi-file-text' },
  ]);

  constructor() {
    // You can also set the current year in the constructor if needed
    // this.currentYear = new Date().getFullYear();
  }
}
