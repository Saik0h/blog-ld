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
  isLoading = this.server.isLoading();
  error = this.server.hasError();
  artigo = signal<Artigo | null>(null);
  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.server.getOne(+id).subscribe({
        next: (artigo) => {
          this.artigo.set(artigo);
        },
      });
    }
  }
}
