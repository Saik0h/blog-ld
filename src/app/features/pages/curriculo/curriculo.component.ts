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
  public readonly error = signal(false);
  public readonly editMode = signal(false);
  public readonly profile = signal<CurriculumPersonalData | null>(null);
  public readonly contactInfo = signal<CurriculumContactInfo | null>(null);
  public readonly academicInfo = signal<CurriculumAcademicInfo | null>(null);
  public readonly teachingInfo = signal<CurriculumTeachingInfo | null>(null);
  public readonly experienceInfo = signal<CurriculumExperienceInfo | null>(
    null
  );
  newItemLabel = model('')
  newItemLink = model('')
  newItemPlatform = model('')

  constructor() {
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

  editar() {
    this.editMode.set(!this.editMode());
  }

  deleteAcademicItem = (id: number) => {
    this.server.deleteAcademicItem(id).subscribe({
      next: (res) => console.log(res),
    });
  };

  createAcademicItem = (body: { description: string }) => {
    this.server.createAcademicItem(body).subscribe({
      next: (res) => console.log(res),
    });
  };

  updateAcademicItem = (id: number, body: { description: string }) => {
    this.server.updateAcademicItem(id, body).subscribe({
      next: (res) => console.log(res),
    });
  };

  deleteExperienceItem = (id: number) => {
    this.server.deleteExperiencesItem(id).subscribe({
      next: (res) => console.log(res),
    });
  };

  createExperienceItem = (body: { description: string }) => {
    this.server.createExperiencesItem(body).subscribe({
      next: (res) => console.log(res),
    });
  };

  updateExperienceItem = (id: number, body: { description: string }) => {
    this.server.updateExperiencesItem(id, body).subscribe({
      next: (res) => console.log(res),
    });
  };

  deleteTeachingItem = (id: number) => {
    this.server.deleteTeachingItem(id).subscribe({
      next: (res) => console.log(res),
    });
  };

  createTeachingItem = (body: { description: string }) => {
    this.server.createTeachingItem(body).subscribe({
      next: (res) => console.log(res),
    });
  };

  updateTeachingItem = (id: number, body: { description: string }) => {
    this.server.updateTeachingItem(id, body).subscribe({
      next: (res) => console.log(res),
    });
  };

  deleteContactItem = (id: number) => {
    this.server.deleteContactItem(id).subscribe({
      next: (res) => console.log(res),
    });
  };

  createContactItem = (body: {label: string, link: string, platform: string}) => {
    this.server.createContactItem(body).subscribe({
      next: (res) => console.log(res),
    });
  };

  updateContactItem = (item: {id: number, label: string, link: string, platform: string}) => {
    this.server.updateContactItem(item).subscribe({
      next: (res) => console.log(res),
    });
  };


}
