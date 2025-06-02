import { TitleCasePipe } from '@angular/common';
import { Component, Input, input, model, signal } from '@angular/core';
import {
  CurriculumAcademicInfo,
  CurriculumExperienceInfo,
  CurriculumTeachingInfo,
} from '../../../../../core/utils/types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-curriculo-section',
  imports: [TitleCasePipe, FormsModule],
  templateUrl: './curriculo-section.component.html',
  styleUrl: './curriculo-section.component.css',
})
export class CurriculoSectionComponent {
  isEditing = signal(false);
  topic = input<
    CurriculumAcademicInfo | CurriculumExperienceInfo | CurriculumTeachingInfo
  >();
  @Input() updateTitle = (data: { title: string }) => {};
  @Input() updateItem = (id: number, data: { description: string }) => {};
  @Input() createItem = (body: { description: string }) => {};
  @Input() deleteItem = (id: number) => {};
  newItem = model<string>('');
  toggle = () => {
    this.isEditing.set(!this.isEditing());
  };
  updateItemInput = model<string>();
  updateField = (data: { title: string }) => {
    this.updateField(data);
    this.isEditing.set(false);
  };

  create = (body: { description: string }) => {
    this.createItem(body);
  };
  delete = (id: number) => {
    this.deleteItem(id);
  };
  update = (id: number, data: { description: string }) => {
    this.updateItem(id, data);
  };
}
