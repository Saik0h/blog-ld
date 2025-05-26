import { Component, inject, input, Input, Signal, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Post } from '../../../../core/utils/types';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-blog-details',
  imports: [DatePipe, TitleCasePipe],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css',
})
export class BlogDetailComponent {
  private route = inject(ActivatedRoute);
  private server = inject(AuthService);
  post = signal<Post>({
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
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.server.getOnePost(id).subscribe((post) => {
        this.post.set(post);
      });
    }
  }
}
