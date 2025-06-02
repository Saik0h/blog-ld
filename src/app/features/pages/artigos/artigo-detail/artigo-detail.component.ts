import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../../../core/utils/types';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { PostService } from '../../../../core/services/post.service';
import { throwError } from 'rxjs';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { PageNotFoundComponent } from '../../shared/page-not-found/page-not-found.component';

@Component({
  selector: 'app-artigo-detail',
  imports: [DatePipe, TitleCasePipe, PageNotFoundComponent, LoadingComponent],
  templateUrl: './artigo-detail.component.html',
  styleUrl: './artigo-detail.component.css',
})
export class ArtigoDetailComponent {
  private route = inject(ActivatedRoute);
  private server = inject(PostService);
  isLoading = signal(false);
  error = signal(false);
  artigo = signal<Post>({
    id: '',
    authorId: '',
    author: {
      firstname: '',
      lastname: '',
      profileImage: '',
    },
    title: '',
    image: '',
    text: '',
    references: [],
    createdAt: '',
    updatedAt: '',
  });
  constructor() {
    this.isLoading.set(true);
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.server.getOneArtigo(id).subscribe({
        next: (post) => {
          this.artigo.set(post);
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
