import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { Blog } from '../../../../core/utils/types';
import { PostCardComponent } from '../../shared/post-card/post-card.component';
import { PostService } from '../../../../core/services/post.service';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { ResourceNotFoundComponent } from '../../shared/resource-not-found/resource-not-found.component';

@Component({
  selector: 'app-blog-list',
  imports: [PostCardComponent, LoadingComponent, ResourceNotFoundComponent],
  templateUrl: './blog-list.component.html',
  styles: [
    `
      :host {
        display: block;
        padding: 2rem;
        background-color: var(--color-light, hsl(60, 100%, 97%));
      }

      /* Título */
      h3 {
        font-size: 2rem;
        color: var(--color-dark, hsl(204, 86%, 6%));
        margin-bottom: 1rem;
        text-align: center;
        border-bottom: 2px solid var(--color-accent, hsl(35, 100%, 55%));
        padding-bottom: 0.5rem;
      }

      /* Grid para artigos */
      section {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
      }

      /* Estilo adicional para o card, caso precise (opcional) */
      app-post-card {
        display: block;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s, box-shadow 0.3s;
        background-color: white;
      }

      app-post-card:hover {
        transform: translateY(-1px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
      }
    `,
  ],
})
export class BlogListComponent {
  isLoading = signal(false);
  blogs = signal<Blog[]>([]);
  error = signal(false);
  private server = inject(PostService);

  title = signal('Blogs')
  constructor() {
    this.isLoading.set(true);
    this.server.getBlogs().subscribe({
      next: (blogs) => {
        this.blogs.set([...(blogs as Blog[])]);
      },
      error: () => {
        this.error.set(true);
        this.isLoading.set(false)
      },
      complete: () => this.isLoading.set(false),
    });
  }
}
