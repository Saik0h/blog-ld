import { Component, inject, signal } from '@angular/core';
import { User } from '../../../../core/utils/types';
import { UserProfileCardComponent } from '../ui/user-profile-card/user-profile-card.component';
import { UserService } from '../auth/services/user-service';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { PostFormComponent } from '../ui/post-form/post-form.component';

@Component({
  selector: 'app-user',
  imports: [UserProfileCardComponent, PostFormComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  isLoading: boolean = false;
  user = signal<User>({
    id: '',
    profileImage: '',
    firstname: '',
    lastname: '',
    username: '',
    role: '',
  });

  private server = inject(UserService);
  private router = inject(Router);

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

  logout = () => {
    this.server.logout().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        throwError(() => err);
      },
    });
  }
}
