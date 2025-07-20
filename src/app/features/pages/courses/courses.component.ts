import { Component, signal } from '@angular/core';
import { RecursoTemporariamenteIndisponivelComponent } from '../shared/recurso-temporariamente-indisponivel/recurso-temporariamente-indisponivel.component';
import { LoadingComponent } from '../shared/loading/loading.component';
import { CoursesListLoaderComponent } from "./ui/courses-list-loader/courses-list-loader.component";

@Component({
  selector: 'app-courses',
  imports: [
    RecursoTemporariamenteIndisponivelComponent,
    LoadingComponent,
    CoursesListLoaderComponent
],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent {
  public readonly title = signal('Cursos');
}
