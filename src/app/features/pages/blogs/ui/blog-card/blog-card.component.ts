import { Component, Input } from '@angular/core';
import { Blog } from '../../../../../core/utils/types';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog-card',
  imports: [DatePipe],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css',
})
export class BlogCardComponent {
  @Input({ required: true }) blog: Blog | null = null;
}
