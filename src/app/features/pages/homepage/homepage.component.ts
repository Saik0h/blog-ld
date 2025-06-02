import { Component } from '@angular/core';
import { AboutComponent } from './components/about/about.component';
import { HeroComponent } from './components/hero/hero.component';
import { FaqComponent } from './components/faq/faq.component';

@Component({
  selector: 'app-homepage',
  imports: [AboutComponent, HeroComponent, FaqComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
