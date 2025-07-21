import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { ArtigoListStore } from '../../data-access/artigo.store.service';
import { ListComponent } from './components/list/list.component';
import { UnavailableResourceComponent } from '../../../shared/resource-temporarily-unavailable/unavailable-resource.component';

@Component({
  selector: 'app-artigo-list',
  imports: [UnavailableResourceComponent, LoadingComponent, ListComponent],
  templateUrl: './artigo-list.component.html',
  styleUrl: './artigo-list.component.css',
})
export class ArtigoListComponent {
  title = signal('Artigos');
  private articleService = inject(ArtigoListStore);
  readonly isLoading = this.articleService.isLoading;
}
