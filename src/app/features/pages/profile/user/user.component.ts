import { Component, inject, signal } from '@angular/core';
import { User } from '../../../../core/utils/types';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { UserProfileCardComponent } from '../ui/user-profile-card/user-profile-card.component';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-user',
  imports: [UserProfileCardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  user = signal<User>({
    id: '',
    profileImage: 'https://placehold.co/600x400',
    firstname: '',
    lastname: '',
    username: '',
    role: '',
  });

  private server = inject(UserService);

  ngOnInit() {
    this.server.getMe().subscribe({
      next: (data) => {
        this.user.set(data as User)
        console.log(this.user())
      }
    })
  }

}
