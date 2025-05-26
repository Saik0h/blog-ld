import { CommonModule } from '@angular/common';
import { Component, input, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface button {
  type: Signal<string>;
  text: Signal<string>;
  class: Signal<string>;
  goTo?: Signal<string>;
}

@Component({
  selector: 'app-button',
  imports: [RouterLink, CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent implements button {
  type = input('button');
  text = input('Placeholder text');
  goTo = input('');
  class = input('any');
}
