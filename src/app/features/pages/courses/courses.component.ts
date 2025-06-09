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
   styles: [
    `
      :host {
        display: block;
        padding: 2rem;
        background-color: var(--color-light, hsl(60, 100%, 97%));
      }

      /* Título */
      h3 {
        font-size: 2rem;
        color: var(--color-dark, hsl(204, 86%, 6%));
        margin-bottom: 1rem;
        text-align: center;
        border-bottom: 2px solid var(--color-accent, hsl(35, 100%, 55%));
        padding-bottom: 0.5rem;
      }

      /* Grid para artigos */
      section {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
      }

      /* Estilo adicional para o card, caso precise (opcional) */
      app-post-card {
        display: block;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s, box-shadow 0.3s;
        background-color: white;
      }

      app-post-card:hover {
        transform: translateY(-1px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
      }
    `,
  ],
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
}
