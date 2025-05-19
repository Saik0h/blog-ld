import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from '../../animations/route-animations';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  animations: [slideInAnimation],
  template: ` <app-header></app-header>
    <main
      class="router-container"
      [@routeAnimation]="prepareRoute(outlet)"
    >
      <router-outlet #outlet="outlet"></router-outlet>
    </main>
    <app-footer></app-footer>`,
  styles: [
    `
      .router-container {
        position: relative;
        overflow: hidden;
        min-height: 100vh; /* Opcional, para evitar colapsar altura */
      }
    `,
  ],
})
export class LayoutComponent {
  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData?.['animation'];
  }
}
