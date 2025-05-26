import { Component, Input } from '@angular/core';
import { BlogCardComponent } from "../blog-card/blog-card.component";
import { Blog } from '../../../../../../core/utils/types';
@Component({
  selector: 'app-list',
  imports: [BlogCardComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent{
  @Input() blogs: Blog[] = [];
}

