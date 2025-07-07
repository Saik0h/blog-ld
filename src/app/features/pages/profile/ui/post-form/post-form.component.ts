import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  BlogCreatePayload,
  PostPayload,
} from '../../../../../core/utils/types';
import { BlogService } from '../../../../../core/services/blog.service';

@Component({
  selector: 'app-post-form',
  imports: [FormsModule, ReactiveFormsModule],
  providers: [],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css',
})
export class PostFormComponent {
  private server = inject(BlogService);
  public postPayload = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    text: new FormControl('', [Validators.required]),
    tags: new FormControl(''),
    image: new FormControl<File | null>(null),
  });

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.postPayload.patchValue({
        image: file,
      });
      this.postPayload.get('image')?.updateValueAndValidity();
    }
  }

  onSubmit(payload: any) {
    const blogCreatePayload = {
      title: payload.title,
      text: payload.text,
      tagNames: payload.tags
        ? payload.tags.split(',').map((tag: string) => tag.trim())
        : [],
        image: ''
    };
    const image = payload.image as File;

    this.server.create(blogCreatePayload, image, 'blog-images').subscribe({
      next: (response) => {
        console.log('Post created successfully:', response);
      },
      error: (error) => {
        console.error('Error creating post:', error);
      },
      complete: () => {
        this.postPayload.reset();
        console.log('Post creation process completed');
      },
    });
  }
}
