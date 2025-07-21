import { Component, inject, OnInit } from '@angular/core';
import { ArtigoListStore } from '../../../../data-access/artigo.store.service';
import { ArtigoCardComponent } from "../artigo-card/artigo-card.component";
import { ResourceEmptyComponent } from "../../../../../shared/resource-empty/resource-empty.component";
import { LoadingComponent } from "../../../../../shared/loading/loading.component";
import { UnavailableResourceComponent } from '../../../../../shared/resource-temporarily-unavailable/unavailable-resource.component';

@Component({
  selector: 'app-list',
  imports: [ArtigoCardComponent, ResourceEmptyComponent, LoadingComponent, UnavailableResourceComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  private articleService = inject(ArtigoListStore);
  readonly isLoading = this.articleService.isLoading;
  readonly error = this.articleService.hasError;
  public readonly artigos = this.articleService.artigos;

  ngOnInit() {
    this.articleService.loadAllArticles();
  }
}
