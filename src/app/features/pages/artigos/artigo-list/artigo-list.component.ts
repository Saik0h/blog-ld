import { Component, inject, signal } from '@angular/core';
import { Artigo } from '../../../../core/utils/types';
import { PostCardComponent } from '../../shared/post-card/post-card.component';
import { PostService } from '../../../../core/services/post.service';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { ResourceNotFoundComponent } from '../../shared/resource-not-found/resource-not-found.component';

@Component({
  selector: 'app-artigo-list',
  imports: [PostCardComponent, ResourceNotFoundComponent, LoadingComponent],
  templateUrl: './artigo-list.component.html',
  styles: [
    `
      :host {
        display: block;
        padding: 2rem;
        background-color: var(--color-light, hsl(60, 100%, 97%));
      }

      h3 {
        font-size: 2rem;
        color: var(--color-dark, hsl(204, 86%, 6%));
        margin-bottom: 1rem;
        text-align: center;
        border-bottom: 2px solid var(--color-accent, hsl(35, 100%, 55%));
        padding-bottom: 0.5rem;
      }

      section {
        display: grid;
        grid-template-columns: repeat(1fr, minmax(280px, 1fr));
        gap: 1.5rem;
      }

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
export class ArtigoListComponent {
  isLoading = signal(false);
  error = signal(false);
  title = signal('Artigos')
  artigos = signal<Artigo[]>([]);

  private server = inject(PostService);

  constructor() {
    this.isLoading.set(true);
    this.server.getArtigos().subscribe({
      next: (artigos) => {
        this.artigos.set([...(artigos as Artigo[])]);
      },
      error: () => {
        this.error.set(true);
        this.isLoading.set(false);
      },
      complete: () => this.isLoading.set(false),
    });
  }
}
