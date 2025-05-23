import { Component, inject, Input, signal } from '@angular/core';
import { User } from '../../../../../core/utils/types';
import { UserService } from '../../auth/services/user-service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-user-profile-card',
  templateUrl: './user-profile-card.component.html',
  styleUrls: ['./user-profile-card.component.css']
})
export class UserProfileCardComponent {
  @Input() user = signal<User>(
    {
      id: '',
      profileImage: '',
      firstname: '',
      lastname: '',
      username: '',
      role: ''
    }
  )!
  server = inject(UserService)
  logout = () => {
  this.server.logout()  
  }

}