import { Component, inject, signal } from '@angular/core';
import { ListComponent } from './ui/list/list.component';
import { Artigo } from '../../../../core/utils/types';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-artigo-list',
  imports: [ListComponent],
  template: `<h2 class="artigos-header">Artigos</h2>
    <app-list [artigos]="artigos()" />`,
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
