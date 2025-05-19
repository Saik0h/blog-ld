import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = signal<string>(new Date().getFullYear().toString()); 
  developedBy = signal<string>('Desenvolvido por: Cristhyan Magarão');

  socialsNavLinks = signal<{ label: string; url: string }[]>([
    { label: 'Instagram', url: '/' },
    { label: 'Whatsapp', url: '/sobre' },
    { label: 'LinkedIn', url: '/sobre' },
  ])

  internalNavLinks = signal<{ label: string; url: string }[]>([
    { label: 'Sobre', url: '/sobre' },
    { label: 'Contato', url: '/contato' },
    { label: 'Termos de Uso', url: '/' },
  ])

  constructor() {
    // You can also set the current year in the constructor if needed
    // this.currentYear = new Date().getFullYear();
  }
}
