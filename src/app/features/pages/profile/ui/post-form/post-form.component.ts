import { Component, inject, Input, input, model, signal } from '@angular/core';
import { UserService } from '../../../../../core/services/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Post, PostPayload } from '../../../../../core/utils/types';
import { Router } from '@angular/router';
import { ImageService } from '../../../../../core/services/image.service';

@Component({
  selector: 'app-post-form',
  imports: [FormsModule, CommonModule],
  providers: [NgForm],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css',
})
export class PostFormComponent {
  private userService = inject(UserService);
  private imageService = inject(ImageService);
  image = signal<File | null>(null);

  private router = inject(Router);
  post = model<PostPayload>({
    category: 'BLOG',
    text: '',
    title: '',
    references: [],
  });
  imageUrl = signal<string>('');
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
      this.image.set(file);
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

  onSubmit() {
    this.imageService.uploadImage(this.image()!, 'laisdonida').subscribe({
      next: (res) => {
        this.imageUrl.set(res.url);

        const payload = {
          ...this.post(),
          image: res.url,
        };

        const urlToGo = this.post().category === 'BLOG' ? `/blogs` : `/artigos`;
        this.userService.post(payload).subscribe({
          next: (res: Post) => this.router.navigate([`${urlToGo}/${res.id}`]),
          error: (err) => console.error('Erro ao criar post:', err),
        });
      },
      error: (err) => {
        console.error('Erro ao fazer upload da imagem:', err);
      },
    });
  }
}
