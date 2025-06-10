import { Component, inject, signal } from '@angular/core';
import { RecursoTemporariamenteIndisponivelComponent } from '../shared/recurso-temporariamente-indisponivel/recurso-temporariamente-indisponivel.component';
import { Course } from '../../../core/utils/types';
import { CourseService } from '../../../core/services/curso.service';
import { LoadingComponent } from '../shared/loading/loading.component';
import { ResourceEmptyComponent } from '../shared/resource-empty/resource-empty.component';
import { CourseCardComponent } from './ui/course-card/course-card.component';

@Component({
  selector: 'app-courses',
  imports: [RecursoTemporariamenteIndisponivelComponent, LoadingComponent, ResourceEmptyComponent, CourseCardComponent],
  templateUrl: './courses.component.html',
   styleUrl:'./courses.component.css',
})
export class CoursesComponent {
  isLoading = signal(false);
  courses = signal<Course[]>([]);
  error = signal(false);
  private server = inject(CourseService);

  title = signal('Cursos')
  constructor() {
    this.isLoading.set(true);
    this.server.getAll().subscribe({
      next: (courses) => {
        this.courses.set(courses);
      },
      error: () => {
        this.error.set(true);
        this.isLoading.set(false)
      },
      complete: () => this.isLoading.set(false),
    });
  }

//   coursesTest =[
//   {
//     "authorId": "1",
//     "author": {
//       "firstname": "Lucas",
//       "lastname": "Silva",
//       "profileImage": "https://randomuser.me/api/portraits/men/1.jpg"
//     },
//     "id": "1",
//     "title": "Curso Completo de JavaScript",
//     "image": "https://placehold.co/600x400",
//     "link": "https://example.com/cursos/javascript-completo",
//     "tags": [
//       { "id": 1, "name": "JavaScript" },
//       { "id": 2, "name": "Web" }
//     ],
//     "description": "Domine JavaScript do básico ao avançado neste curso completo e interativo.",
//     "createdAt": "09/06/2025",
//     "updatedAt": "09/06/2025"
//   },
//   {
//     "authorId": "2",
//     "author": {
//       "firstname": "Maria",
//       "lastname": "Souza",
//       "profileImage": "https://randomuser.me/api/portraits/women/2.jpg"
//     },
//     "id": "2",
//     "title": "CSS Flexbox e Grid: Layout Moderno",
//     "image": "https://placehold.co/600x400",
//     "link": "https://example.com/cursos/css-flexbox-grid",
//     "tags": [
//       { "id": 3, "name": "CSS" },
//       { "id": 4, "name": "Design" }
//     ],
//     "description": "Crie interfaces responsivas com Flexbox e Grid de forma prática e eficiente.",
//     "createdAt": "09/06/2025",
//     "updatedAt": "09/06/2025"
//   },
//   {
//     "authorId": "3",
//     "author": {
//       "firstname": "João",
//       "lastname": "Pereira",
//       "profileImage": "https://randomuser.me/api/portraits/men/3.jpg"
//     },
//     "id": "3",
//     "title": "TypeScript na Prática",
//     "image": "https://placehold.co/600x400",
//     "link": "https://example.com/cursos/typescript",
//     "tags": [
//       { "id": 5, "name": "TypeScript" },
//       { "id": 2, "name": "Desenvolvimento" }
//     ],
//     "description": "Aprenda a tipar seu JavaScript e torne seu código mais seguro e produtivo.",
//     "createdAt": "09/06/2025",
//     "updatedAt": "09/06/2025"
//   },
//   {
//     "authorId": "4",
//     "author": {
//       "firstname": "Ana",
//       "lastname": "Costa",
//       "profileImage": "https://randomuser.me/api/portraits/women/4.jpg"
//     },
//     "id": "4",
//     "title": "Produtividade para Desenvolvedores",
//     "image": "https://placehold.co/600x400",
//     "link": "https://example.com/cursos/produtividade-devs",
//     "tags": [
//       { "id": 6, "name": "Produtividade" },
//       { "id": 2, "name": "Desenvolvimento" }
//     ],
//     "description": "Descubra como organizar seu dia a dia e produzir mais como desenvolvedor.",
//     "createdAt": "09/06/2025",
//     "updatedAt": "09/06/2025"
//   },
//   {
//     "authorId": "5",
//     "author": {
//       "firstname": "Pedro",
//       "lastname": "Almeida",
//       "profileImage": "https://randomuser.me/api/portraits/men/5.jpg"
//     },
//     "id": "5",
//     "title": "Angular 16: Primeiros Passos",
//     "image": "https://placehold.co/600x400",
//     "link": "https://example.com/cursos/angular16",
//     "tags": [
//       { "id": 7, "name": "Angular" },
//       { "id": 2, "name": "Desenvolvimento" }
//     ],
//     "description": "Aprenda a construir aplicações modernas usando Angular 16.",
//     "createdAt": "09/06/2025",
//     "updatedAt": "09/06/2025"
//   },
//   {
//     "authorId": "6",
//     "author": {
//       "firstname": "Fernanda",
//       "lastname": "Mendes",
//       "profileImage": "https://randomuser.me/api/portraits/women/6.jpg"
//     },
//     "id": "6",
//     "title": "React Essencial",
//     "image": "https://placehold.co/600x400",
//     "link": "https://example.com/cursos/react-essencial",
//     "tags": [
//       { "id": 8, "name": "React" },
//       { "id": 2, "name": "Desenvolvimento" }
//     ],
//     "description": "Comece a desenvolver aplicações interativas usando React.",
//     "createdAt": "09/06/2025",
//     "updatedAt": "09/06/2025"
//   },
//   {
//     "authorId": "7",
//     "author": {
//       "firstname": "Carlos",
//       "lastname": "Ferreira",
//       "profileImage": "https://randomuser.me/api/portraits/men/7.jpg"
//     },
//     "id": "7",
//     "title": "Node.js para Iniciantes",
//     "image": "https://placehold.co/600x400",
//     "link": "https://example.com/cursos/nodejs-iniciantes",
//     "tags": [
//       { "id": 9, "name": "Node.js" },
//       { "id": 2, "name": "Backend" }
//     ],
//     "description": "Entenda o básico do Node.js e comece a construir suas primeiras APIs.",
//     "createdAt": "09/06/2025",
//     "updatedAt": "09/06/2025"
//   },
//   {
//     "authorId": "8",
//     "author": {
//       "firstname": "Beatriz",
//       "lastname": "Oliveira",
//       "profileImage": "https://randomuser.me/api/portraits/women/8.jpg"
//     },
//     "id": "8",
//     "title": "Git e GitHub: Controle de Versão",
//     "image": "https://placehold.co/600x400",
//     "link": "https://example.com/cursos/git-github",
//     "tags": [
//       { "id": 10, "name": "Git" },
//       { "id": 11, "name": "GitHub" }
//     ],
//     "description": "Aprenda a usar Git e GitHub para gerenciar seus projetos de forma colaborativa.",
//     "createdAt": "09/06/2025",
//     "updatedAt": "09/06/2025"
//   },
//   {
//     "authorId": "9",
//     "author": {
//       "firstname": "Rafael",
//       "lastname": "Dias",
//       "profileImage": "https://randomuser.me/api/portraits/men/9.jpg"
//     },
//     "id": "9",
//     "title": "Banco de Dados Relacional",
//     "image": "https://placehold.co/600x400",
//     "link": "https://example.com/cursos/sql-basico",
//     "tags": [
//       { "id": 12, "name": "SQL" },
//       { "id": 13, "name": "Banco de Dados" }
//     ],
//     "description": "Introdução ao uso de bancos de dados relacionais com SQL.",
//     "createdAt": "09/06/2025",
//     "updatedAt": "09/06/2025"
//   },
//   {
//     "authorId": "10",
//     "author": {
//       "firstname": "Juliana",
//       "lastname": "Fernandes",
//       "profileImage": "https://randomuser.me/api/portraits/women/10.jpg"
//     },
//     "id": "10",
//     "title": "UX/UI Design para Desenvolvedores",
//     "image": "https://placehold.co/600x400",
//     "link": "https://example.com/cursos/ux-ui-design",
//     "tags": [
//       { "id": 14, "name": "UX/UI" },
//       { "id": 4, "name": "Design" }
//     ],
//     "description": "Entenda os princípios de UX/UI e aprimore a experiência do usuário em seus projetos.",
//     "createdAt": "09/06/2025",
//     "updatedAt": "09/06/2025"
//   }
// ]
}
