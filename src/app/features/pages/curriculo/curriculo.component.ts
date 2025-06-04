import { Component, inject, model, signal } from '@angular/core';
import { CurriculumService } from '../../../core/services/curriculum.service';
import {
  Curriculum,
  CurriculumAcademicInfo,
  CurriculumContactInfo,
  CurriculumExperienceInfo,
  CurriculumPersonalData,
  CurriculumTeachingInfo,
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

  public readonly error = signal(false);
  public readonly editMode = signal(false);
  public readonly profile = signal<CurriculumPersonalData | null>(null);
  public readonly contactInfo = signal<CurriculumContactInfo | null>(null);
  public readonly academicInfo = signal<CurriculumAcademicInfo | null>(null);
  public readonly teachingInfo = signal<CurriculumTeachingInfo | null>(null);
  public readonly experienceInfo = signal<CurriculumExperienceInfo | null>(
    null
  );
  newItemLabel = model('');
  newItemLink = model('');
  newItemPlatform = model('');

  loadCurriculum() {
    this.isLoading.set(true);
    this.server.getCurriculum().subscribe({
      next: (res: Curriculum) => {
        this.profile.set({
          firstname: res.firstname,
          lastname: res.lastname,
          profileImage: res.profileImage,
          credential: res.credential,
          jobTitle: res.jobTitle,
        });
        this.academicInfo.set(res.academic_field);
        this.contactInfo.set(res.contact_field);
        this.experienceInfo.set(res.experiences_field);
        this.teachingInfo.set(res.teaching_field);
      },
      error: (err) => {
        this.error.set(true);
        this.isLoading.set(false);
        throwError(() => err);
      },
      complete: () => this.isLoading.set(false),
    });
  }

  constructor() {
    this.loadCurriculum();
  }

  editar() {
    this.editMode.set(!this.editMode());
  }

  UpdateProfileInfo() {
    this.isProcessing.set(true);
    this.server.updateCurriculum(this.profile()).subscribe({
      error: (err) => {
        throwError(() => err);
      },
      complete: () => {
        this.editMode.set(false);
        this.isProcessing.set(false);
      },
    });
  }

  deleteAcademicItem = (id: number) => {
    this.isProcessing.set(true);
    this.server.deleteAcademicItem(id).subscribe({
      next: (res) => {},
      error: (err) => {
        this.isProcessing.set(false);
        throwError(() => err);
      },
      complete: () => {
        this.isProcessing.set(false);
      },
    });
  };

  createAcademicItem = (body: { description: string }) => {
    this.isProcessing.set(true);
    this.server.createAcademicItem(body).subscribe({
      next: (res) => {},
      error: (err) => {
        this.isProcessing.set(false);
        throwError(() => err);
      },
      complete: () => {
        this.isProcessing.set(false);
      },
    });
  };

  updateAcademicItem = (id: number, body: { description: string }) => {
    this.isProcessing.set(true);
    this.server.updateAcademicItem(id, body).subscribe({
      next: (res) => {},
      error: (err) => {
        this.isProcessing.set(false);
        throwError(() => err);
      },
      complete: () => {
        this.isProcessing.set(false);
      },
    });
  };

  deleteExperienceItem = (id: number) => {
    this.isProcessing.set(true);
    this.server.deleteExperiencesItem(id).subscribe({
      next: (res) => {},
      error: (err) => {
        this.isProcessing.set(false);
        throwError(() => err);
      },
      complete: () => {
        this.isProcessing.set(false);
      },
    });
  };

  createExperienceItem = (body: { description: string }) => {
    this.isProcessing.set(true);
    this.server.createExperiencesItem(body).subscribe({
      next: (res) => {},
      error: (err) => {
        this.isProcessing.set(false);
        throwError(() => err);
      },
      complete: () => {
        this.isProcessing.set(false);
      },
    });
  };

  updateExperienceItem = (id: number, body: { description: string }) => {
    this.isProcessing.set(true);
    this.server.updateExperiencesItem(id, body).subscribe({
      next: (res) => {},
      error: (err) => {
        this.isProcessing.set(false);
        throwError(() => err);
      },
      complete: () => {
        this.isProcessing.set(false);
      },
    });
  };

  deleteTeachingItem = (id: number) => {
    this.isProcessing.set(true);
    this.server.deleteTeachingItem(id).subscribe({
      next: (res) => {},
      error: (err) => {
        this.isProcessing.set(false);
        throwError(() => err);
      },
      complete: () => {
        this.isProcessing.set(false);
      },
    });
  };

  createTeachingItem = (body: { description: string }) => {
    this.isProcessing.set(true);
    this.server.createTeachingItem(body).subscribe({
      next: (res) => {},
      error: (err) => {
        this.isProcessing.set(false);
        throwError(() => err);
      },
      complete: () => {
        this.isProcessing.set(false);
      },
    });
  };

  updateTeachingItem = (id: number, body: { description: string }) => {
    this.isProcessing.set(true);
    this.server.updateTeachingItem(id, body).subscribe({
      next: (res) => {},
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
    this.server.deleteContactItem(id).subscribe({
      next: (res) => {
        this.loadCurriculum();
      },
      error: (err) => {
        this.isProcessing.set(false);
        throwError(() => err);
      },
      complete: () => {
        this.isProcessing.set(false);
      },
    });
  };

  createContactItem = (body: {
    label: string;
    link: string;
    platform: string;
  }) => {
    this.isProcessing.set(true);
    this.server.createContactItem(body).subscribe({
      next: (res) => {},
      error: (err) => {
        this.isProcessing.set(false);
        throwError(() => err);
      },
      complete: () => {
        this.isProcessing.set(false);
      },
    });
  };

  updateContactItem = (item: {
    id: number;
    label: string;
    link: string;
    platform: string;
  }) => {
    this.isProcessing.set(true);
    this.server.updateContactItem(item).subscribe({
      next: (res) => {},
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
