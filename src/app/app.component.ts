import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './core/animations/route-animations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  animations: [slideInAnimation],
  template: `<router-outlet></router-outlet> `,
})
export class AppComponent {}
