import { Component, inject, signal } from '@angular/core';
import { Blog } from '../../../../core/utils/types';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { ResourceEmptyComponent } from '../../shared/resource-empty/resource-empty.component';
import { BlogService } from '../../../../core/services/blog.service';
import { RecursoTemporariamenteIndisponivelComponent } from '../../shared/recurso-temporariamente-indisponivel/recurso-temporariamente-indisponivel.component';
import { BlogCardComponent } from '../ui/blog-card/blog-card.component';

@Component({
  selector: 'app-blog-list',
  imports: [
    LoadingComponent,
    ResourceEmptyComponent,
    RecursoTemporariamenteIndisponivelComponent,
    BlogCardComponent
  ],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css',
})
export class BlogListComponent {
  isLoading = signal(false);
  blogs = signal<Blog[] | null>([]);
  error = signal(false);
  private server = inject(BlogService);

  title = signal('Blogs');
  constructor() {
    this.isLoading.set(true);
    this.server.getAll().subscribe({
      next: (blogs: Blog[]) => {
        this.blogs.set(blogs);
      },
      error: () => {
        this.error.set(true);
        this.isLoading.set(false);
      },
      complete: () => this.isLoading.set(false),
    });
  }

  blogsTeste: Blog[] = [
  {
    "author": {
      "firstname": "Lucas",
      "lastname": "Silva",
      "profileImage": "https://randomuser.me/api/portraits/men/1.jpg"
    },
    "authorId": "1",
    "title": "Guia Completo de JavaScript",
    "updatedAt": "09/06/2025",
    "createdAt": "09/06/2025",
    "id": "1",
    "image": "https://placehold.co/600x400",
    "tags": [
      { "id": 1, "name": "JavaScript" },
      { "id": 2, "name": "Web" }
    ],
    "text": "Um guia completo para iniciantes e desenvolvedores avançados que desejam dominar o JavaScript."
  },
  {
    "author": {
      "firstname": "Maria",
      "lastname": "Souza",
      "profileImage": "https://randomuser.me/api/portraits/women/2.jpg"
    },
    "authorId": "2",
    "title": "CSS Moderno: Flexbox e Grid",
    "updatedAt": "09/06/2025",
    "createdAt": "09/06/2025",
    "id": "2",
    "image": "https://placehold.co/600x400",
    "tags": [
      { "id": 1, "name": "CSS" },
      { "id": 3, "name": "Design" }
    ],
    "text": "Como criar layouts responsivos e bonitos usando Flexbox e Grid."
  },
  {
    "author": {
      "firstname": "João",
      "lastname": "Pereira",
      "profileImage": "https://randomuser.me/api/portraits/men/3.jpg"
    },
    "authorId": "3",
    "title": "Introdução ao TypeScript",
    "updatedAt": "09/06/2025",
    "createdAt": "09/06/2025",
    "id": "3",
    "image": "https://placehold.co/600x400",
    "tags": [
      { "id": 1, "name": "TypeScript" },
      { "id": 2, "name": "Desenvolvimento" }
    ],
    "text": "Aprenda a tipar seu JavaScript e ganhar produtividade com TypeScript."
  },
  {
    "author": {
      "firstname": "Ana",
      "lastname": "Costa",
      "profileImage": "https://randomuser.me/api/portraits/women/4.jpg"
    },
    "authorId": "4",
    "title": "Dicas de Produtividade para Desenvolvedores",
    "updatedAt": "09/06/2025",
    "createdAt": "09/06/2025",
    "id": "4",
    "image": "https://placehold.co/600x400",
    "tags": [
      { "id": 4, "name": "Produtividade" },
      { "id": 2, "name": "Desenvolvimento" }
    ],
    "text": "Descubra como se organizar melhor e produzir mais no dia a dia como dev."
  },
  {
    "author": {
      "firstname": "Pedro",
      "lastname": "Almeida",
      "profileImage": "https://randomuser.me/api/portraits/men/5.jpg"
    },
    "authorId": "5",
    "title": "Introdução ao Angular 16",
    "updatedAt": "09/06/2025",
    "createdAt": "09/06/2025",
    "id": "5",
    "image": "https://placehold.co/600x400",
    "tags": [
      { "id": 5, "name": "Angular" },
      { "id": 2, "name": "Desenvolvimento" }
    ],
    "text": "Guia prático para começar com Angular 16 e construir aplicações modernas."
  }
]

}
