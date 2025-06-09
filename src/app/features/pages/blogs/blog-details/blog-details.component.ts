import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../../../../core/utils/types';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { throwError } from 'rxjs';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { PageNotFoundComponent } from '../../shared/page-not-found/page-not-found.component';
import { BlogService } from '../../../../core/services/blog.service';

@Component({
  selector: 'app-blog-details',
  imports: [DatePipe, PageNotFoundComponent, LoadingComponent],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css',
})
export class BlogDetailComponent {
  private route = inject(ActivatedRoute);
  private server = inject(BlogService);
  isLoading = signal(false);
  error = signal(false);
  blog = signal<Blog | null>(null);
  constructor() {
    this.isLoading.set(true);
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.server.getOne(+id).subscribe({
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
