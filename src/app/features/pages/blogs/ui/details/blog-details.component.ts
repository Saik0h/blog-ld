import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../../../../../core/utils/types';
import { DatePipe } from '@angular/common';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { PageNotFoundComponent } from '../../../shared/page-not-found/page-not-found.component';
import { BlogStoreService } from '../../data-access/blog-detail.store.service';

@Component({
  selector: 'app-blog-details',
  imports: [DatePipe, PageNotFoundComponent, LoadingComponent],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css',
})
export class BlogDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogStoreService);
  
  public readonly isLoading = this.blogService.isLoading;
  public readonly error = this.blogService.hasError;
  public readonly blog = this.blogService.blog;


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.blogService.loadBlog(id);
    }
  }

  delete = () => {
    this.blogService.delete(this.blog()!.id);
  };
}
