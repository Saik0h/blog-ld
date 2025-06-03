import { Component, effect, inject, Input, signal } from '@angular/core';
import { User } from '../../../../../core/utils/types';
import { ImageService } from '../../../../../shared/helpers/storeImage';
@Component({
  selector: 'app-user-profile-card',
  templateUrl: './user-profile-card.component.html',
  styleUrl: './user-profile-card.component.css',
})
export class UserProfileCardComponent {
  imgService = inject(ImageService);
  @Input() user = signal<User>({
    id: '',
    profileImage: '',
    firstname: '',
    lastname: '',
    username: '',
    role: '',
  });
  @Input() logout = () => {};
  public readonly open = signal(false);
  uploadImage(e: any) {
    this.imgService.uploadImage(e, this.user());
  }
  logoutUser() {
    this.logout();
  }
}
