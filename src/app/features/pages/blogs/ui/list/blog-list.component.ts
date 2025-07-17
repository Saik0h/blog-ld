import { Component, inject, OnInit, signal } from '@angular/core';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { RecursoTemporariamenteIndisponivelComponent } from '../../../shared/recurso-temporariamente-indisponivel/recurso-temporariamente-indisponivel.component';
import { ResourceEmptyComponent } from '../../../shared/resource-empty/resource-empty.component';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { BlogListStoreService } from '../../data-access/blog-list.store.service';

@Component({
  selector: 'app-blog-list',
  imports: [
    LoadingComponent,
    ResourceEmptyComponent,
    BlogCardComponent,
  ],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css',
})
export class BlogListComponent implements OnInit {
  public readonly title = signal('Blogs');
  private blogService = inject(BlogListStoreService);
  public readonly blogs = this.blogService.blogs;
  public readonly isLoading = this.blogService.isLoading;
  public readonly error = this.blogService.hasError;

  ngOnInit() {
    this.blogService.loadAllBlogs();
  }
}
