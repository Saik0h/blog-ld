import { Component, EventEmitter, inject, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CurriculumCreatePayload } from '../../../../../core/utils/types';
import { CurriculumService } from '../../../../../core/services/curriculum.service';
import { ImageService } from '../../../../../core/services/image.service';

@Component({
  selector: 'app-create-curriculum-form',
  imports: [ReactiveFormsModule],
  templateUrl: './create-curriculum-form.component.html',
  styleUrl: './create-curriculum-form.component.css',
})
export class CreateCurriculumFormComponent {
  server = inject(CurriculumService);
  imagePreview: string | null = null;
  imageService = inject(ImageService);
  image: File | null = null;

  public newCurriculumForm = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    jobTitle: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    credential: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    profileImage: new FormControl('', [
      Validators.required,
      Validators.pattern(
        'https?://(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b[-a-zA-Z0-9()@:%_\\+.~#?&//=]*'
      ),
    ]),
  });

  onImageSelected(input: HTMLInputElement): void {;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
      this.image = file;
    }
  }

  onSubmit = () => {
    this.imageService.uploadImage(this.image!).subscribe({
      next: (imageUrl) => {
        console.log('Image uploaded successfully:', imageUrl);
        const payload: CurriculumCreatePayload = {
          firstname: this.newCurriculumForm.value.firstname!,
          lastname: this.newCurriculumForm.value.lastname!,
          jobTitle: this.newCurriculumForm.value.jobTitle!,
          credential: this.newCurriculumForm.value.credential!,
          profileImage: imageUrl.url,
        };
        this.server.createCurriculum(payload).subscribe({
          next: (response) => {
            console.log('Curriculum created successfully:', response);
          },
          error: (error) => {
            console.error('Error creating curriculum:', error);
            this.newCurriculumForm.reset();
          },
        });
      },
      error: (error) => {
        console.error('Error uploading image:', error);
        this.newCurriculumForm.reset();
      },
      complete: () => {
        this.newCurriculumForm.reset();
      },
    });
  };
}
