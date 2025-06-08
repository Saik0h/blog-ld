import { TitleCasePipe } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { Field, UpdateFieldPayload } from '../../../../../core/utils/types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-curriculo-section',
  imports: [TitleCasePipe, FormsModule],
  templateUrl: './curriculo-section.component.html',
  styleUrl: './curriculo-section.component.css',
})
export class CurriculoSectionComponent {
  @Input({ required: true }) updateSection = (
    fieldData: UpdateFieldPayload
  ) => {};
  @Input({ required: true }) fieldInfo: Field = {
    id: 0,
    title: '',
    items: [''],
  };
  @Input({ required: true }) deleteField = (id: number) => {};
  @Input({ required: true }) userHasPermission = signal<boolean>(false);
  @Input({ required: true }) globalEdit = signal<boolean>(false);

  readonly isEditing = signal(false);
userIsAdmin = ()=>{
  return this.userHasPermission()
}
  editTitle(value: string) {
    this.fieldInfo.title = value;
  }

  pushNewItem = (input: HTMLTextAreaElement) => {
    const value = input.value;
    if (!value) return;
    this.fieldInfo.items.push(value);
    input.value = '';
  };

  editItem(index: number, newValue: string) {
    if (!this.fieldInfo || !this.fieldInfo.items) return;

    this.fieldInfo.items[index] = newValue;

    console.log(this.fieldInfo.items);
  }

  deleteItem = (index: number) => {
    this.fieldInfo.items.splice(index, 1);
  };

  save = (fieldData: UpdateFieldPayload) => {
    this.updateSection(fieldData);
    this.isEditing.set(false);
  };

  deleteThis = (id: number) => {
    return this.deleteField(id);
  };
}
