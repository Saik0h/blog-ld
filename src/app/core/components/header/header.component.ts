import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderBtnComponent } from "./header-btn/header-btn.component";

@Component({
  selector: 'app-header',
  imports: [RouterLink, HeaderBtnComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
title= signal('Website Logo')
}
