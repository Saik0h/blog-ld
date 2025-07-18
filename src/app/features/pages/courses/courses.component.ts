import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RecursoTemporariamenteIndisponivelComponent } from '../shared/recurso-temporariamente-indisponivel/recurso-temporariamente-indisponivel.component';
import { Course } from '../../../core/utils/types';
import { CourseService } from '../../../core/services/curso.service';
import { LoadingComponent } from '../shared/loading/loading.component';
import { ResourceEmptyComponent } from '../shared/resource-empty/resource-empty.component';
import { CourseCardComponent } from './ui/course-card/course-card.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-courses',
  imports: [
    RecursoTemporariamenteIndisponivelComponent,
    LoadingComponent,
    ResourceEmptyComponent,
    CourseCardComponent,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent implements OnInit {
  public readonly title = signal('Cursos');
  private courseService = inject(CourseService);
  private readonly authService = inject(AuthService);

  public readonly userHasPermission = signal(false);
  public readonly isLoading = this.courseService.isLoading;
  public readonly error = this.courseService.hasError;
  readonly courses = this.courseService.courses;

  ngOnInit() {
    this.authService.getAuthorization().subscribe({
      next: (res) => this.userHasPermission.set(res),
    });
    this.courseService.loadAllCourses();
  }

  readonly coursesMemo = computed(() => this.courses());

  readonly hasCourses = computed(() => {
    const list = this.courses();
    return list && list.length > 0;
  });

  hasError = computed(() => !!this.error());

  delete = (id: string) => {
    this.courseService.delete(+id);
  };
}
