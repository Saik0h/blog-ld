import { Component, inject, OnInit } from '@angular/core';
import { BlogListStoreService } from '../../../../data-access/blog-list.store.service';
import { ResourceEmptyComponent } from '../../../../../shared/resource-empty/resource-empty.component';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { LoadingComponent } from '../../../../../shared/loading/loading.component';
import { UnavailableResourceComponent } from '../../../../../shared/resource-temporarily-unavailable/unavailable-resource.component';

@Component({
  selector: 'app-blog-list',
  imports: [
    UnavailableResourceComponent,
    ResourceEmptyComponent,
    BlogCardComponent,
    LoadingComponent,
  ],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css',
})
export class BlogListSubComponent implements OnInit {
  private blogService = inject(BlogListStoreService);
  public readonly blogs = this.blogService.blogs;
  public readonly isLoading = this.blogService.isLoading;
  public readonly error = this.blogService.hasError;

  ngOnInit() {
    this.blogService.loadAllBlogs();
  }
}
