import { Component, computed, inject, signal } from '@angular/core';
import { CourseCardComponent } from "../course-card/course-card.component";
import { ResourceEmptyComponent } from "../../../shared/resource-empty/resource-empty.component";
import { RecursoTemporariamenteIndisponivelComponent } from "../../../shared/recurso-temporariamente-indisponivel/recurso-temporariamente-indisponivel.component";
import { LoadingComponent } from "../../../shared/loading/loading.component";
import { AuthService } from '../../../../../core/services/auth.service';
import { CourseService } from '../../../../../core/services/curso.service';

@Component({
  selector: 'app-courses-list-loader',
  imports: [CourseCardComponent, ResourceEmptyComponent, RecursoTemporariamenteIndisponivelComponent, LoadingComponent],
  templateUrl: './courses-list-loader.component.html',
  styleUrl: './courses-list-loader.component.css'
})
export class CoursesListLoaderComponent {  private courseService = inject(CourseService);
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
