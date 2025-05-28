import { DatePipe, SlicePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../../../../core/utils/types';

@Component({
  selector: 'app-post-card',
  imports: [RouterLink, SlicePipe, DatePipe],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  @Input({ required: true }) category: string = '';
  @Input({ required: true }) post: Post = {
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
  };
}
