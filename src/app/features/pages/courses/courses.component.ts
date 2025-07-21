import { Component, signal } from '@angular/core';
import { LoadingComponent } from '../shared/loading/loading.component';
import { CoursesListLoaderComponent } from "./ui/courses-list-loader/courses-list-loader.component";
import { UnavailableResourceComponent } from "../shared/resource-temporarily-unavailable/unavailable-resource.component";

@Component({
  selector: 'app-courses',
  imports: [
    LoadingComponent,
    CoursesListLoaderComponent,
    UnavailableResourceComponent
],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent {
  public readonly title = signal('Cursos');
}
