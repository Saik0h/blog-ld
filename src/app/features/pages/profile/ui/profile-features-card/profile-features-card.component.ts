import { Component, input } from '@angular/core';

@Component({
  selector: 'app-profile-features-card',
  imports: [],
  templateUrl: './profile-features-card.component.html',
  styleUrl: './profile-features-card.component.css'
})
export class ProfileFeaturesCardComponent {
title = input()
content = input()
}
