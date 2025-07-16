import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { PageNotFoundComponent } from '../../shared/page-not-found/page-not-found.component';
import { Artigo, Blog } from '../../../../core/utils/types';
import { ArtigoService } from '../../../../core/services/artigo.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-artigo-detail',
  imports: [DatePipe, TitleCasePipe, PageNotFoundComponent, LoadingComponent],
  templateUrl: './artigo-detail.component.html',
  styleUrl: './artigo-detail.component.css',
})
export class ArtigoDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private server = inject(ArtigoService);
  private authService = inject(AuthService);
  public readonly isLoading = this.server.isLoading;
  public readonly error = this.server.hasError;
  public readonly artigo = signal<Artigo | null>(null);
  public readonly hasPermission = signal(false);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.server.getOne(+id).subscribe({
        next: (artigo) => {
          this.artigo.set(artigo);
          this.authService.getUser().subscribe({
            next: (user) => {
              if (user.id === this.artigo()?.authorId)
                this.hasPermission.set(true);
            },
          });
        },
      });
    }
  }
  
  delete = () => {
    this.server.delete(+this.artigo()!.id).subscribe();
  };
}
