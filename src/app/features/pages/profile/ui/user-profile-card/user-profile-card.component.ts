import { Component, effect, inject, Input, signal } from '@angular/core';
import { User } from '../../../../../core/utils/types';
import { UserService } from '../../../../../core/services/user.service';
import { ImageService } from '../../../../../core/services/image.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-user-profile-card',
  templateUrl: './user-profile-card.component.html',
  styleUrl: './user-profile-card.component.css',
})
export class UserProfileCardComponent {
  @Input({ required: true }) user = signal<User | null>(null).asReadonly();
  @Input({ required: true }) logout = (): void => {};
  userService = inject(UserService);
  imageService = inject(ImageService);
  uploadProfileImage(input: HTMLInputElement) {
    const file = input.files![0];

    this.imageService
      .uploadImage(file)
      .subscribe({
        next: (res) => {
          this.userService
            .updateProfilePhoto(+this.user()!.id, res.url)
            .subscribe({
              error(err) {
                throwError(() => err);
              },
            });
        },
        error: (err) => throwError(() => err),
      });
  }

  public readonly open = signal(false);
  readonly isEditing = signal(false);
  readonly previewUrl = signal<string | null>(null);
  private readonly image = signal<File | null>(null);

  onProfileImageChange(event: Event) {
    this.isEditing.set(true);
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.previewUrl.set(e.target?.result as string);
      };
      this.image.set(file);
      console.log(this.image());
      reader.readAsDataURL(file);
    }
  }
  logoutUser = () => {
    this.logout();
  };
}
