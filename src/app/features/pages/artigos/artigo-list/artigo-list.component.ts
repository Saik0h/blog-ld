import { Component, inject, signal } from '@angular/core';
import { Artigo } from '../../../../core/utils/types';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { PostCardComponent } from '../../shared/blog-card/post-card.component';

@Component({
  selector: 'app-artigo-list',
  imports: [PostCardComponent],
  template: `
    <h3>Artigos</h3>
    <section>
      @for (artigo of artigos(); track artigo.id){
      <app-post-card category="artigos" [post]="artigo" />
      }
    </section>
  `,
  styles: [
    `
      .artigos-header {
        width: fit-content;
        margin-inline: auto;
        margin-block-start: 1rem;
      }
    `,
  ],
})
export class ArtigoListComponent {
  artigos = signal<Artigo[]>([]);

  private authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.getArtigos().subscribe({
      next: (artigos) => {
        console.log(artigos);
        this.artigos.set([...(artigos as Artigo[])]);
      },
      error: (err) => console.error('Erro ao carregar artigos:', err),
    });
  }
}
