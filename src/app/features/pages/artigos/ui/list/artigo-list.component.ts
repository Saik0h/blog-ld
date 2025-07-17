import { Component, inject, OnInit, signal } from '@angular/core';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { ResourceEmptyComponent } from '../../../shared/resource-empty/resource-empty.component';
import { RecursoTemporariamenteIndisponivelComponent } from '../../../shared/recurso-temporariamente-indisponivel/recurso-temporariamente-indisponivel.component';
import { ArtigoCardComponent } from './components/artigo-card/artigo-card.component';
import { ArtigoListStore } from '../../data-access/artigo.store.service';

@Component({
  selector: 'app-artigo-list',
  imports: [
    RecursoTemporariamenteIndisponivelComponent,
    ResourceEmptyComponent,
    LoadingComponent,
    ArtigoCardComponent,
  ],
  templateUrl: './artigo-list.component.html',
  styleUrl: './artigo-list.component.css',
})
export class ArtigoListComponent implements OnInit {
  title = signal('Artigos');
  
  private articleService = inject(ArtigoListStore);
  readonly isLoading = this.articleService.isLoading;
  readonly error = this.articleService.hasError;
  public readonly artigos = this.articleService.artigos;
  
  ngOnInit() {
    this.articleService.loadAllArticles();
  }
}
