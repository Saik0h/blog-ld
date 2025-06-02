import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog, Post } from '../../../../core/utils/types';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { PostService } from '../../../../core/services/post.service';
import { throwError } from 'rxjs';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { PageNotFoundComponent } from '../../shared/page-not-found/page-not-found.component';

@Component({
  selector: 'app-blog-details',
  imports: [DatePipe, TitleCasePipe, PageNotFoundComponent, LoadingComponent],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css',
})
export class BlogDetailComponent {
  private route = inject(ActivatedRoute);
  private server = inject(PostService);
  isLoading = signal(false);
  error = signal(false);
  blog = signal<Blog | null>(null);
  constructor() {
    this.isLoading.set(true);
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.server.getOneBlog(id).subscribe({
        next: (b: Blog) => {
          this.blog.set(b);
        },
        error: (err) => {
          this.error.set(true);
          this.isLoading.set(false);
          throwError(() => err);
        },
        complete: () => this.isLoading.set(false),
      });
    } else {
      this.isLoading.set(false);
    }
  }
}
