import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { fadeAnimation } from '../animations/route-animations';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  animations: [fadeAnimation],
  template: ` <app-header />
    <main class="router-container" [@routeAnimation]="prepareRoute(outlet)">
      <router-outlet #outlet="outlet" />
    </main>
    <app-footer />`,
  styles: [
    `
      .router-container {
        position: relative;
        overflow: hidden;
        min-height: 100vh; 
      }
    `,
  ],
})
export class LayoutComponent {
  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData?.['animation'];
  }
}
