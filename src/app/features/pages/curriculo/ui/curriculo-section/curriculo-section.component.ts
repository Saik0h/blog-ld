import { TitleCasePipe } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { Field, FieldItem } from '../../../../../core/utils/types';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../../../shared/loading/loading.component';

@Component({
  selector: 'app-curriculo-section',
  imports: [TitleCasePipe, FormsModule, LoadingComponent],
  templateUrl: './curriculo-section.component.html',
  styleUrl: './curriculo-section.component.css',
})
export class CurriculoSectionComponent {
  @Input({ required: true }) updateTitle = (id: string, title: string) => {};
  @Input({ required: true }) isLoading = signal<boolean>(false).asReadonly();
  @Input({ required: true }) field!: Field;
  @Input({ required: true }) deleteField = (id: string) => {};
  @Input({ required: true }) updateItem = (
    id: string,
    description: string
  ) => {};
  @Input({ required: true }) deleteFieldItem = (fieldItem: FieldItem) => {};
  @Input({ required: true }) userHasPermission = signal<boolean>(false);
  @Input({ required: true }) globalEdit = signal<boolean>(false);
  @Input({ required: true }) createNewItem = (
    fieldId: string,
    description: string
  ) => {};

  readonly isEditing = signal(false);
  userIsAdmin = () => {
    return this.userHasPermission();
  };

  editTitle(value: string) {
    this.field.title = value;
  }

  editItem(id: string, newValue: string) {
    this.field!.items.map((item) => {
      item.id === id
        ? (item.description = newValue)
        : (item.description = item.description);
    });
  }

  addNewItem = (input: HTMLTextAreaElement) => {
    const value = input.value;
    if (!value) return;
    this.createNewItem(this.field.id, value);
    input.value = '';
  };

  updateFieldTitle = (id: string, title: string) => {
    this.updateTitle(id, title);
    this.isEditing.set(false);
  };

  updateFieldItem = (id: string, description: string) => {
    this.updateItem(id, description);
  };

  deleteThis = (id: string) => {
    return this.deleteField(id);
  };
}
