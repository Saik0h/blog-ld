import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  title = signal<string>('Um pouco sobre mim');
  description = signal<string>(
    'Nascida e criada na zona rural de Santa Catarina, aprendi desde cedo o valor do trabalho. Em minha família, o esforço e os estudos sempre foram pilares fundamentais, valores que me acompanharam ao longo de toda minha trajetória. Estudei em escola pública e, com dedicação, conquistei a graduação, o mestrado e o doutorado, também em instituições públicas. Com mais de 10 anos de atuação profissional, sigo comprometida em unir teoria e prática com responsabilidade, ética e excelência em tudo o que faço.'
  );
  imageUrl = signal<string>('about.webp');

  readonly imgLoaded = signal(false);

  onImageLoad() {
    this.imgLoaded.set(true);
  }
}
