import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { throwError } from 'rxjs';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { PageNotFoundComponent } from '../../shared/page-not-found/page-not-found.component';
import { Artigo, Blog } from '../../../../core/utils/types';
import { ArtigoService } from '../../../../core/services/artigo.service';

@Component({
  selector: 'app-artigo-detail',
  imports: [DatePipe, TitleCasePipe, PageNotFoundComponent, LoadingComponent],
  templateUrl: './artigo-detail.component.html',
  styleUrl: './artigo-detail.component.css',
})
export class ArtigoDetailComponent {
  private route = inject(ActivatedRoute);
  private server = inject(ArtigoService);
  isLoading = signal(false);
  error = signal(false);
  artigo = signal<Artigo | null>(null);
  constructor() {
    this.isLoading.set(true);
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.server.getOne(+id).subscribe({
        next: (artigo) => {
          this.artigo.set(artigo);
        },
        error: (err) => {
          this.error.set(true);
          this.isLoading.set(false);
          throwError(() => err);
        },
        complete: () => this.isLoading.set(false),
      });
    }
    this.isLoading.set(false);
  }
}
