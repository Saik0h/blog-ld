import { Component, inject, signal } from '@angular/core';
import { User } from '../../../../core/utils/types';
import { UserProfileCardComponent } from '../ui/user-profile-card/user-profile-card.component';
import { UserService } from '../auth/services/user-service';

@Component({
  selector: 'app-user',
  imports: [UserProfileCardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  isLoading: boolean = false;
  user = signal<User>({
    id: '',
    profileImage: 'https://placehold.co/600x400',
    firstname: '',
    lastname: '',
    username: '',
    role: '',
  });

  private server = inject(UserService);

  ngOnInit(): void {
    this.isLoading = true;

    this.server.getMe().subscribe({
      next: (data) => {
        this.user.set(data as User);
      },
      error: (err) => {
        console.error('Erro ao obter dados do usuário:', err);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
