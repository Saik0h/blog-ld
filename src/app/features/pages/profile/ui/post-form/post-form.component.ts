import { Component, inject, model, signal } from '@angular/core';
import { UserService } from '../../../../../core/services/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { imageToBase64 } from '../../../../../shared/helpers/imageToBase64';
import { Post, PostPayload } from '../../../../../core/utils/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-form',
  imports: [FormsModule, CommonModule],
  providers: [NgForm],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css',
})
export class PostFormComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  post = model<PostPayload>({
    category: 'BLOG',
    text: '',
    title: '',
    image: '',
    references: [],
  });
  reference = model<string>('');
  imagePreview = signal<string | null>(null);
  pushReference() {
    this.post.update((current) => {
      return {
        ...current,
        references: [...current.references!, this.reference()],
      };
    });
    this.reference.set('');
  }
  selectedImage: File | null = null;

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview.set(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  removeReference(index: number) {
    this.post.update((current) => {
      const updatedReferences = [...current.references!];
      updatedReferences.splice(index, 1);
      return {
        ...current,
        references: updatedReferences,
      };
    });
  }
  async onSubmit() {
    const payload = signal(this.post());
    let img: string | undefined;
    if (!this.selectedImage) {
      img = undefined;
    } else {
      img = await imageToBase64(this.selectedImage);
      payload.update((current) => {
        return {
          ...current,
          image: img!,
        };
      });
    }

    const urlToGo = this.post().category === 'BLOG' ? `/blogs` : `/artigos`;
    this.userService.post(payload()).subscribe({
      next: (res: Post) => this.router.navigate([`${urlToGo}/${res.id}`]),
      error: (err) => console.error('Erro ao criar post:', err),
    });
  }
}
