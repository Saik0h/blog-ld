import { Component, inject, model, signal } from '@angular/core';
import { CurriculumService } from '../../../core/services/curriculum.service';
import {
  CreateContactInfoPayload,
  CreateFieldPayload,
  Curriculum,
  CurriculumUpdatePayload,
  UpdateContactInfoPayload,
  UpdateFieldPayload,
} from '../../../core/utils/types';
import { throwError } from 'rxjs';
import { LoadingComponent } from '../shared/loading/loading.component';
import { CurriculoSectionComponent } from './ui/curriculo-section/curriculo-section.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-curriculo',
  imports: [LoadingComponent, CurriculoSectionComponent, FormsModule],
  templateUrl: './curriculo.component.html',
  styleUrl: './curriculo.component.css',
})
export class CurriculoComponent {
  private server = inject(CurriculumService);
  public readonly isLoading = signal(false);
  public readonly isProcessing = signal(false);

  public readonly editMode = signal(false);
  public readonly curriculum = signal<Curriculum | null>(null);

  newItemLabel = model('');
  newItemLink = model('');
  newItemPlatform = model('');

  loadCurriculum() {
    this.isLoading.set(true);
    this.server.getCurriculum().subscribe({
      next: (res: Curriculum) => {
        this.curriculum.set(res);
      },
      error: (err) => {
        this.isLoading.set(false);
        throwError(() => err);
      },
      complete: () => this.isLoading.set(false),
    });
  }

  constructor() {
    this.loadCurriculum();
  }

  toggle() {
    this.editMode.set(!this.editMode());
  }

  UpdateProfileInfo() {
    this.isProcessing.set(true);

    if (this.curriculum === null) {
      this.isProcessing.set(false)
      return
    };

    const data: CurriculumUpdatePayload = {
      ...this.curriculum()! as CurriculumUpdatePayload
    }

    if (!data) return;

    this.server.updateCurriculum(data).subscribe({
      error: (err) => {
        throwError(() => err);
      },
      complete: () => {
        this.editMode.set(false);
        this.isProcessing.set(false);
      },
    });
  }

  createContactItem = (body: CreateContactInfoPayload) => {
    this.isProcessing.set(true);
    this.server.createContactInfo(body).subscribe({
      error: (err) => {
        this.isProcessing.set(false);
        throwError(() => err);
      },
      complete: () => {
        this.isProcessing.set(false);
      },
    });
  };

  updateContactItem = (item: UpdateContactInfoPayload) => {
    this.isProcessing.set(true);
    this.server.updateContactInfo(item).subscribe({
      error: (err) => {
        this.isProcessing.set(false);
        throwError(() => err);
      },
      complete: () => {
        this.isProcessing.set(false);
      },
    });
  };

  deleteContactItem = (id: number) => {
    this.isProcessing.set(true);
    this.server.deleteContactInfo(id).subscribe({
      error: (err) => {
        this.isProcessing.set(false);
        throwError(() => err);
      },
      complete: () => {
        this.isProcessing.set(false);
      },
    });
  };

  createField = (body: CreateFieldPayload) => {
    this.isProcessing.set(true);
    this.server.createField(body).subscribe({
      error: (err) => {
        this.isProcessing.set(false);
        throwError(() => err);
      },
      complete: () => {
        this.isProcessing.set(false);
      },
    });
  };

  updateField = (item: UpdateFieldPayload) => {
    this.isProcessing.set(true);
    this.server.updateField(item).subscribe({
      error: (err) => {
        this.isProcessing.set(false);
        throwError(() => err);
      },
      complete: () => {
        this.isProcessing.set(false);
      },
    });
  };

  deleteField = (id: number) => {
    this.isProcessing.set(true);
    this.server.deleteField(id).subscribe({
      error: (err) => {
        this.isProcessing.set(false);
        throwError(() => err);
      },
      complete: () => {
        this.isProcessing.set(false);
      },
    });
  };
}
