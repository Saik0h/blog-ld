import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../../../core/utils/types';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { PostService } from '../../../../core/services/post.service';

@Component({
  selector: 'app-artigo-detail',
  imports: [DatePipe, TitleCasePipe],
  templateUrl: './artigo-detail.component.html',
  styleUrl: './artigo-detail.component.css',
})
export class ArtigoDetailComponent {
  private route = inject(ActivatedRoute);
  private server = inject(PostService);
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
