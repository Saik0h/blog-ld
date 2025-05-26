import { Component } from '@angular/core';

@Component({
  selector: 'app-curriculo',
  templateUrl: './curriculo.component.html',
  styleUrl: './curriculo.component.css',
})
export class CurriculoComponent {
  
  profile = {
    pic: 'contact.jpeg',
    picAlt: 'pessoa',
    name: 'Lais Donida',
    job_title: 'Fonoaudiologa',
  }
  contact_info = [
    { plat: 'e-mail', desc:'lais.donida@gmail.com',  link: 'mailTo:lais.donida@gmail.com' },
    { plat: 'linkedIn', desc:'Lais Donida', link: 'https://www.linkedin.com/in/lais-donida-85b57355/' },
    { plat: 'instagram', desc:'@dra.laisdonida', link: 'https://www.instagram.com/dra.laisdonida/' },
  ];

  formacao: string[] = ['Fonoaudióloga graduada Pela UFSC', 'Terapeuta DIR Floortime'];
  experiencia: string[] = ['Autismo', 'Comunicação Alternativa', 'Transtornos motores de fala', 'Atraso motor de fala', 'TDAH', 'Transtorno deo desenvolvimento intelectual', 'Leitura e escrita', 'Afasia'];
  docencia: string[] = ['Professora do curso de fonoaudiologia da UFSC','Professora do programa de pós-graduação em TEA da ACE/FGG (Joinville)'];
}
