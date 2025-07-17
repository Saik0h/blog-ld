import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { PageNotFoundComponent } from '../../../shared/page-not-found/page-not-found.component';
import { ArtigoDetailStore } from '../../data-access/artigo.detail.service';

@Component({
  selector: 'app-artigo-detail',
  imports: [DatePipe, TitleCasePipe, PageNotFoundComponent, LoadingComponent],
  templateUrl: './artigo-detail.component.html',
  styleUrl: './artigo-detail.component.css',
})
export class ArtigoDetailComponent implements OnInit {
  // Dependencies
  private route = inject(ActivatedRoute);
  private artigoService = inject(ArtigoDetailStore);

  // Signals for state management
  public readonly isLoading = this.artigoService.isLoading;
  public readonly error = this.artigoService.hasError;
  public readonly artigo = this.artigoService.artigo;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.artigoService.loadArticle(id);
    }
  }

  delete = () => {
    if (this.artigo() !== null) this.artigoService.delete(this.artigo()!.id);
  };
}
