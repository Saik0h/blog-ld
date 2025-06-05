import { Component, effect, inject, Input, signal } from '@angular/core';
import { User } from '../../../../../core/utils/types';

@Component({
  selector: 'app-user-profile-card',
  templateUrl: './user-profile-card.component.html',
  styleUrl: './user-profile-card.component.css',
})
export class UserProfileCardComponent {
  @Input({required: true}) user = signal<User | null>(null);
  @Input() logout = () => {};
 
  public readonly open = signal(false);
  
  uploadImage(e: any) {
  }

  logoutUser() {
    this.logout();
  }
}
