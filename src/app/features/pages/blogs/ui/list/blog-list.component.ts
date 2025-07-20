import { Component, inject, OnInit, signal } from '@angular/core';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { RecursoTemporariamenteIndisponivelComponent } from '../../../shared/recurso-temporariamente-indisponivel/recurso-temporariamente-indisponivel.component';
import { BlogListStoreService } from '../../data-access/blog-list.store.service';
import { BlogListSubComponent } from './components/blog-list/blog-list.component';

@Component({
  selector: 'app-blog-list-page',
  imports: [
    LoadingComponent,
    RecursoTemporariamenteIndisponivelComponent,
    BlogListSubComponent
],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css',
})
export class BlogListComponent {
  public readonly title = signal('Blog');
}
