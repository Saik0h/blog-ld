import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { fadeAnimation } from '../animations/route-animations';
import { UserWidgetComponent } from "./user-widget/user-widget.component";
import { AuthStoreService } from '../services/auth/auth.service';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, FooterComponent, RouterOutlet, UserWidgetComponent],
  animations: [fadeAnimation],
  template: ` <app-header />
      <app-user-widget />
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
export class LayoutComponent  {

  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData?.['animation'];
  }
}
