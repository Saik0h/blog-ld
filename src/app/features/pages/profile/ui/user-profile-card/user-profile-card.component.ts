import { Component, effect, inject, Input, signal } from '@angular/core';
import { User } from '../../../../../core/utils/types';
import { ImageService } from '../../../../../core/services/image.service';

@Component({
  selector: 'app-user-profile-card',
  templateUrl: './user-profile-card.component.html',
  styleUrl: './user-profile-card.component.css',
})
export class UserProfileCardComponent {
  imgService = inject(ImageService);
  @Input({required: true}) user = signal<User | null>(null);
  @Input() logout = () => {};
  public readonly open = signal(false);
  uploadImage(e: any) {
    this.imgService.uploadImage(e, this.user()!);
  }
  logoutUser() {
    this.logout();
  }
}
