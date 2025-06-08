import { Component, inject, input, model, signal } from '@angular/core';
import { CurriculumService } from '../../../core/services/curriculum.service';
import {
  CreateContactInfoPayload,
  CreateFieldPayload,
  Curriculum,
  CurriculumUpdatePayload,
  Field,
  UpdateContactInfoPayload,
  UpdateFieldPayload,
} from '../../../core/utils/types';
import { throwError } from 'rxjs';
import { LoadingComponent } from '../shared/loading/loading.component';
import { CurriculoSectionComponent } from './ui/curriculo-section/curriculo-section.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ImageService } from '../../../core/services/image.service';

@Component({
  selector: 'app-curriculo',
  imports: [LoadingComponent, CurriculoSectionComponent, FormsModule],
  templateUrl: './curriculo.component.html',
  styleUrl: './curriculo.component.css',
})
export class CurriculoComponent {
  private server = inject(CurriculumService);
  private readonly auth = inject(AuthService);
  public readonly isLoading = signal(false);
  public readonly isProcessing = signal(false);
  public readonly isCreateNewFieldSectionOpen = signal(false);
  public readonly editMode = signal(false);
  public readonly curriculum = signal<Curriculum | null>(null);
  public readonly userHasPermission = signal<boolean>(false);
  newItemLabel = model('');
  newItemLink = model('');
  newItemPlatform = model('');
  imageFromInput = signal<File | null>(null);
  newFielditemsArray: string[] = [];
  imagePreview: string | null = null;
  imageService = inject(ImageService);

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
      this.imageFromInput.set(file);
    }
  }

  save() {
    this.imageService
      .uploadImage(this.imageFromInput()!, 'curriculo')
      .subscribe({
        next: (response) => {
          this.UpdateProfileInfo(response.url);
        },
        error: (err) => throwError(() => err),
      });
  }

  loadCurriculum() {
    this.isLoading.set(true);
    this.auth.getAuthorization().subscribe({
      next: (response) => {
        this.userHasPermission.set(response);
      },
      error: (err) => throwError(() => err),
    });
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

  addItemToArray(item: HTMLTextAreaElement) {
    this.newFielditemsArray.push(item.value);
    item.value = '';
  }

  createNewField(titleInput: HTMLInputElement, itemInput: HTMLTextAreaElement) {
    const value = titleInput.value;
    let newField = {
      id:
        this.curriculum()!.fields[this.curriculum()!.fields.length - 1].id + 1,
      title: value,
      items: this.newFielditemsArray,
    };
    this.server.createField(newField).subscribe({
      error: (err) => throwError(() => err),
    });
    this.curriculum()!.fields.push(newField);
    newField = {
      id: 0,
      title: '',
      items: [],
    };
    titleInput.value = '';
    itemInput.value = '';
  }

  toggle() {
    this.editMode.update((current) => !current);
  }

  toggleCreateSection = () => {
    this.isCreateNewFieldSectionOpen.update((current) => !current);
  };

  UpdateProfileInfo(image?: string) {
    this.isProcessing.set(true);
    const img = signal<string>('');
    if (image) img.set(image);

    if (this.curriculum === null) {
      this.isProcessing.set(false);
      return;
    }

    const data: CurriculumUpdatePayload = img()
      ? {
          firstname: this.curriculum()!.firstname,
          lastname: this.curriculum()!.lastname,
          credential: this.curriculum()!.credential,
          jobTitle: this.curriculum()!.jobTitle,
          profileImage: img(),
        }
      : {
          firstname: this.curriculum()!.firstname,
          lastname: this.curriculum()!.lastname,
          credential: this.curriculum()!.credential,
          jobTitle: this.curriculum()!.jobTitle,
          profileImage: this.curriculum()!.profileImage,
        };

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
