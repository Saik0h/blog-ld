import { Component, signal } from '@angular/core';
import {
  PostFormComponent,
  PostType,
} from '../ui/post-form/post-form.component';

@Component({
  selector: 'app-new-post',
  imports: [PostFormComponent],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css',
})
export class NewPostComponent {
  type = signal<PostType>('artigo');

  isNewBlogOpen = signal<boolean>(false);
  isNewArticleOpen = signal<boolean>(false);
  isNewMaterialOpen = signal<boolean>(false);
  isNewCourseOpen = signal<boolean>(false);

  updateType(input: HTMLSelectElement) {
    this.type.set(input.value as PostType);
  }

  articleToggle() {
    this.isNewArticleOpen.update((current) => !current);
  }
  blogToggle() {
    this.isNewBlogOpen.update((current) => !current);
  }
  courseToggle() {
    this.isNewCourseOpen.update((current) => !current);
  }

  materialToggle() {
    this.isNewMaterialOpen.update((current) => !current);
  }

  pt = {
    artigo: 'artigo' as PostType,
    blog: 'blog' as PostType,
    material: 'material' as PostType,
    curso: 'curso' as PostType,
  };
}
