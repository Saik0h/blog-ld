import { Component, inject, Input, signal } from '@angular/core';
import { User } from '../../../../../core/utils/types';
import { UserService } from '../../../../../core/services/user.service';
import { ImageUploaderComponent } from '../../../shared/image-uploader/image-uploader.component';

@Component({
  selector: 'app-user-profile-card',
  templateUrl: './user-profile-card.component.html',
  styleUrl: './user-profile-card.component.css',
  imports: [ImageUploaderComponent],
})
export class UserProfileCardComponent {
  @Input({ required: true }) user = signal<User | null>(null).asReadonly();
  @Input({ required: true }) logout = (): void => {};
  userService = inject(UserService);
  imageURL = signal<string | null>(null);

  onImageUploaded(url: string) {
    this.imageURL.set(url);
  }

  uploadProfileImage() {
    const url = this.imageURL();
    if (!url) return;
    this.userService.updateProfilePhoto(+this.user()!.id, url).subscribe();
  }

  public readonly open = signal(false);
  readonly isEditing = signal(false);
  readonly previewUrl = signal<string | null>(null);
  private readonly image = signal<File | null>(null);

  logoutUser = () => {
    this.logout();
  };
}
