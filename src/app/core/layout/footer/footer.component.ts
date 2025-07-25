import { Component, signal } from '@angular/core';
import { SvgIconComponent } from "../../shared/svg-icon/svg-icon.component";

@Component({
  selector: 'app-footer',
  providers: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  imports: [SvgIconComponent],
})
export class FooterComponent {
  currentYear = signal<string>(new Date().getFullYear().toString());
  developedBy = signal<string>('Cristhyan Magarão');

  socialsNavLinks = signal<{ label: string; url: string; icon: string }[]>([
    {
      label: 'Instagram',
      url: 'https://www.instagram.com/dra.laisdonida/',
      icon: 'instagram',
    },
    {
      label: 'Whatsapp',
      url: 'https://wa.me/5548988570407',
      icon: 'whatsapp'
    },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/lais-donida-85b57355/',
      icon: 'linkedIn',
    },
  ]);
}
