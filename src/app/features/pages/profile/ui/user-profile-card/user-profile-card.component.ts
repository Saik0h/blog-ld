import { Component, Input, signal } from '@angular/core';
import { User } from '../../../../../core/utils/types';

@Component({
  selector: 'app-user-profile-card',
  templateUrl: './user-profile-card.component.html',
  styleUrl: './user-profile-card.component.css',
})
export class UserProfileCardComponent {
  @Input() user = signal<User>({
    id: '',
    profileImage: '',
    firstname: '',
    lastname: '',
    username: '',
    role: '',
  });
  @Input() logout = () => {};

  logoutUser() {
    this.logout();
  }
}
