import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { ListComponent } from './ui/list/list.component';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Blog } from '../../../../core/utils/types';

@Component({
  selector: 'app-blog-list',
  imports: [ListComponent],
  template: ` <h3>Blogs</h3>
    <app-list [blogs]="blogs()" />`,
  styles: [
    `
      h3 {
        width: fit-content;
        margin-inline: auto;
        margin-block-start: 1rem;
      }
    `,
  ],
})
export class BlogListComponent implements OnInit {
  blogs = signal<Blog[]>([]);

  private authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.getBlogs().subscribe({
      next: (blogs) => {
        console.log(blogs)
        this.blogs.set([...(blogs as Blog[])]);
      },
      error: (err) => console.error('Erro ao carregar blogs:', err),
    });
  }
}