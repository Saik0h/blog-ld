import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Blog } from '../../../../core/utils/types';
import { PostCardComponent } from '../../shared/blog-card/post-card.component';
import { PostService } from '../../../../core/services/post.service';

@Component({
  selector: 'app-blog-list',
  imports: [PostCardComponent],
  template: `
    <h3>Blogs</h3>
    <section>
      @for (blog of blogs(); track blog.id){
      <app-post-card category="blogs" [post]="blog"></app-post-card>
      }
    </section>
  `,
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

  private server = inject(PostService);

  ngOnInit(): void {
    this.server.getBlogs().subscribe({
      next: (blogs) => {
        console.log(blogs);
        this.blogs.set([...(blogs as Blog[])]);
      },
      error: (err) => console.error('Erro ao carregar blogs:', err),
    });
  }
}
