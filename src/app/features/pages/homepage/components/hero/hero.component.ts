import { Component, signal } from '@angular/core';
import { ButtonComponent } from '../../../../../core/shared/button.component';

@Component({
  selector: 'app-hero',
  imports: [ButtonComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  btnText = signal('Saiba mais!');
}
