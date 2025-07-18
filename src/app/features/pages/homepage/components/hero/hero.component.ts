import { Component, inject, Renderer2, signal } from '@angular/core';
import { ButtonComponent } from '../../../../../core/shared/button.component';

@Component({
  selector: 'app-hero',
  imports: [ButtonComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  btnText = signal('Saiba mais!');
  private renderer: Renderer2 = inject(Renderer2);

  ngAfterViewInit() {
    const img = new Image();
    img.src = '/homepage.jpg';
    img.onload = () => {
      const heroSection = document.querySelector('.hero');
      if (heroSection) {
        this.renderer.addClass(heroSection, 'loaded');
      }
    };
  }
}
