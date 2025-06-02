import { Component, Input, input, signal } from '@angular/core';
import { Mail } from '../../../../../core/utils/types';

@Component({
  selector: 'app-profile-features-card',
  imports: [],
  templateUrl: './profile-features-card.component.html',
  styleUrl: './profile-features-card.component.css'
})
export class ProfileFeaturesCardComponent {
title = input()
@Input() content = signal<Mail[]>([])

}
