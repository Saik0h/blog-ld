import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hamburger-menu',
  imports: [RouterLink],
  templateUrl: './menu-hamburger.component.html',
  styleUrls: ['./menu-hamburger.component.css'],
})
export class HamburgerMenuComponent {
  @Input() links: Array<{ label: string; path: string }> = [];
  @Output() menuToggled = new EventEmitter<boolean>();

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.menuToggled.emit(this.menuOpen);
  }
}