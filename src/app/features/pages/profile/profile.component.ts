import { Component, inject, signal } from '@angular/core';
import { UserProfileCardComponent } from './ui/user-profile-card/user-profile-card.component';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/utils/types';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ProfileFeaturesCardComponent } from './ui/profile-features-card/profile-features-card.component';

@Component({
  selector: 'app-profile',
  imports: [UserProfileCardComponent, ProfileFeaturesCardComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
router = inject(Router);
  authService = inject(AuthService);
  user = signal<User>({
    firstname:'',
    id:'',
    lastname:'',
    profileImage:'',
    role:'',
    username:''
    
  });
  constructor() {
    this.authService.getUser().subscribe({
      next: (user: User) => this.user.set(user),
      error: (err)=> throwError(()=> err)
    });
  }

  logout = ()=>{
    this.authService.logout().subscribe({
      next:()=>{this.router.navigate(['/'])}
    })
  }
}
