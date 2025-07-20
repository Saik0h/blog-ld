import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { ResourceEmptyComponent } from '../../../shared/resource-empty/resource-empty.component';
import { RecursoTemporariamenteIndisponivelComponent } from '../../../shared/recurso-temporariamente-indisponivel/recurso-temporariamente-indisponivel.component';
import { ArtigoCardComponent } from './components/artigo-card/artigo-card.component';
import { ArtigoListStore } from '../../data-access/artigo.store.service';
import { ListComponent } from './components/list/list.component';

@Component({
  selector: 'app-artigo-list',
  imports: [
    RecursoTemporariamenteIndisponivelComponent,
    LoadingComponent,
    ListComponent,
  ],
  templateUrl: './artigo-list.component.html',
  styleUrl: './artigo-list.component.css',
})
export class ArtigoListComponent {
  title = signal('Artigos');
  private articleService = inject(ArtigoListStore);
  readonly isLoading = this.articleService.isLoading;
}
