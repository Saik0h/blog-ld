import { Component, inject, model, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurriculumService } from '../../../core/services/curriculum.service';
import { AuthService } from '../../../core/services/auth.service';
import { ImageService } from '../../../core/services/image.service';

import {
  Curriculum,
  CurriculumUpdatePayload,
  CreateContactInfoPayload,
  UpdateContactInfoPayload,
  CreateFieldPayload,
  UpdateFieldPayload,
} from '../../../core/utils/types';

import { LoadingComponent } from '../shared/loading/loading.component';
import { CurriculoSectionComponent } from './ui/curriculo-section/curriculo-section.component';
import { CreateCurriculumFormComponent } from './ui/create-curriculum-form/create-curriculum-form.component';
import { RecursoTemporariamenteIndisponivelComponent } from '../shared/recurso-temporariamente-indisponivel/recurso-temporariamente-indisponivel.component';

@Component({
  selector: 'app-curriculo',
  standalone: true,
  imports: [
    LoadingComponent,
    CurriculoSectionComponent,
    CreateCurriculumFormComponent,
    RecursoTemporariamenteIndisponivelComponent,
    FormsModule,
  ],
  templateUrl: './curriculo.component.html',
  styleUrl: './curriculo.component.css',
})
export class CurriculoComponent {
  // ==== Serviços ====
  private readonly curriculumService = inject(CurriculumService);
  private readonly authService = inject(AuthService);
  private readonly imageService = inject(ImageService);

  // ==== Estados ====
  public readonly curriculum = signal<Curriculum | null>(null);
  public readonly isCreateNewFieldSectionOpen = signal(false);
  public readonly editMode = signal(false);
  public readonly userHasPermission = signal(false);
  public readonly error = this.curriculumService.hasError();

  public readonly isRequestingGet = this.curriculumService.isRequestingGet();
  public readonly isRequestingPostOrPatch =
    this.curriculumService.isRequestingCreateOrUpdate();
  public readonly isRequestingDelete =
    this.curriculumService.isRequestingDelete();

  // ==== Inputs controlados ====
  public newItemLabel = model('');
  public newItemLink = model('');
  public newItemPlatform = model('');
  public imageFromInput = signal<File | null>(null);
  public imagePreview = signal<string | null>(null);
  public newFieldItemsArray: string[] = [];

  constructor() {
    this.getAuthorization();
    this.loadCurriculum();
  }

  private getAuthorization() {
    this.authService.getAuthorization().subscribe({
      next: (res) => this.userHasPermission.set(res),
    });
  }

  private loadCurriculum() {
    this.curriculumService.getCurriculum().subscribe({
      next: (res) => this.curriculum.set(res),
    });
  }

  public onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview.set(reader.result as string);
    };

    reader.readAsDataURL(file);
    this.imageFromInput.set(file);
  }

  public save = () => {
    const file = this.imageFromInput();
    if (file) {
      this.imageService.uploadImage(file).subscribe({
        next: ({ url }) => this.updateProfileInfo(url),
      });
    } else {
      this.updateProfileInfo();
    }
  };

  private updateProfileInfo = (imageUrl?: string) => {
    const current = this.curriculum();
    if (!current) return;

    const payload: CurriculumUpdatePayload = {
      firstname: current.firstname,
      lastname: current.lastname,
      credential: current.credential,
      jobTitle: current.jobTitle,
      profileImage: imageUrl,
    };

    this.curriculumService.updateCurriculum(payload).subscribe();
  };

  // ==== Campos do Currículo ====

  public addItemToArray = (item: HTMLTextAreaElement) => {
    if (item.value.trim()) {
      this.newFieldItemsArray.push(item.value.trim());
      item.value = '';
    }
  };

  public createNewField = (
    titleInput: HTMLInputElement,
    itemInput: HTMLTextAreaElement
  ) => {
    const title = titleInput.value.trim();
    if (!title || this.newFieldItemsArray.length === 0) return;

    const field: CreateFieldPayload = {
      title,
      itemsDescription: this.newFieldItemsArray,
    };

    this.curriculumService.createField(field).subscribe();
    titleInput.value = '';
    itemInput.value = '';
    this.newFieldItemsArray = [];
  };

  public toggleEditMode = () => this.editMode.update((v) => !v);
  public toggleCreateSection = () =>
    this.isCreateNewFieldSectionOpen.update((v) => !v);

  // ==== CRUD Contatos ====

  public createContactItem = (body: CreateContactInfoPayload) => {
    this.curriculumService.createContactInfo(body).subscribe();
  };

  public updateContactItem = (item: UpdateContactInfoPayload) => {
    this.curriculumService.updateContactInfo(item).subscribe();
  };

  public deleteContactItem = (id: number) => {
    this.curriculumService.deleteContactInfo(id).subscribe();
  };

  // ==== CRUD Campos ====

  public createField = (body: CreateFieldPayload) => {
    this.curriculumService.createField(body).subscribe();
  };

  public updateField = (item: UpdateFieldPayload) => {
    this.curriculumService.updateField(item).subscribe();
  };

  public deleteField = (id: number) => {
    this.curriculumService.deleteField(id).subscribe();
  };

  public deleteFieldItem = (id: number) => {
    this.curriculumService.deleteFieldItem(id).subscribe();
  };
}
