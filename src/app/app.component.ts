import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CoreModule],
  providers:[HttpClient, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = signal('Lais Donida');
}
