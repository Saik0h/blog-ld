import { Component, inject, signal } from '@angular/core';
import { RecursoTemporariamenteIndisponivelComponent } from '../shared/recurso-temporariamente-indisponivel/recurso-temporariamente-indisponivel.component';
import { Material } from '../../../core/utils/types';
import { MaterialService } from '../../../core/services/material.service';
import { LoadingComponent } from '../shared/loading/loading.component';
import { ResourceEmptyComponent } from '../shared/resource-empty/resource-empty.component';
import { MaterialCardComponent } from './ui/material-card/material-card.component';

@Component({
  selector: 'app-materiais',
  imports: [RecursoTemporariamenteIndisponivelComponent, LoadingComponent, ResourceEmptyComponent, MaterialCardComponent],
  templateUrl: './materiais.component.html',
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
export class MateriaisComponent {
isLoading = signal(false);
  error = signal(false);
  title = signal('Materiais Gratuitos')
  materials = signal<Material[]>([]);

  private server = inject(MaterialService);

  constructor() {
    this.isLoading.set(true);
    this.server.getAll().subscribe({
      next: (materiais) => {
        this.materials.set(materiais);
      },
      error: () => {
        this.error.set(true);
        this.isLoading.set(false);
      },
      complete: () => this.isLoading.set(false),
    });
  }
}
