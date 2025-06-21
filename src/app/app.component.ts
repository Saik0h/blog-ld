import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  animations: [],
  template: `<router-outlet />`,
})
export class AppComponent {}
