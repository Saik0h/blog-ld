import { Component, Input } from '@angular/core';
import { Course } from '../../../../../core/utils/types';

@Component({
  selector: 'app-course-card',
  imports: [],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css',
})
export class CourseCardComponent {
  @Input({ required: true }) course: Course | null = null;
}
