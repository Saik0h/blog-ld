import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Blog } from '../../../../../../../core/utils/types';

@Component({
  selector: 'app-blog-card',
  imports: [DatePipe, RouterLink],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css',
})
export class BlogCardComponent {
  @Input({ required: true }) blog!: Blog ;
}
