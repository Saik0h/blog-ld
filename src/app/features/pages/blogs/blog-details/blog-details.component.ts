import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-blog-details',
  imports: [],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css',
})
export class BlogDetailsComponent {
  blog = signal({
    title: 'Olá Mundo',
    content: 'lorem ipsum dolor sit amet consectetur adipiscing elit',
    imageUrl: 'https://picsum.photos/200/300',
  });
}
