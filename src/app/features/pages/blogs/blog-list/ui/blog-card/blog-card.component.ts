import { DatePipe, SlicePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Blog } from '../../../../../../core/utils/types';

@Component({
  selector: 'app-blog-card',
  imports: [RouterLink, SlicePipe, DatePipe],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css',
})
export class BlogCardComponent {
  @Input({ required: true }) Blog: Blog = {
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
