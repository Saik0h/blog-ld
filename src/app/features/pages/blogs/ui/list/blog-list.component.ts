import { Component, signal } from '@angular/core';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { UnavailableResourceComponent } from '../../../shared/resource-temporarily-unavailable/unavailable-resource.component';
import { BlogListSubComponent } from './components/blog-list/blog-list.component';

@Component({
  selector: 'app-blog-list-page',
  imports: [
    LoadingComponent,
    UnavailableResourceComponent,
    BlogListSubComponent,
  ],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css',
})
export class BlogListComponent {
  public readonly title = signal('Blog');
}
