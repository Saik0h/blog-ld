import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { ImageService } from './image.service';

@Component({
  selector: 'app-image-uploader',
  imports: [],
  template: ` <input type="file" (change)="upload($event)" />
    @if(imagePreview()){
    <img [src]="imagePreview()" alt="Descrição da imagem" width="100%" />
    }`,
  styleUrl: './image-uploader.component.css',
})
export class ImageUploaderComponent {
  @Output() uploadedUrl = new EventEmitter<string>();

  private imageService: ImageService = inject(ImageService);
  public imagePreview = signal<string | null>(null);
  upload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      this.imagePreview.set(result);
    };

    reader.readAsDataURL(file);
    this.imageService.uploadImage(file).subscribe((url) => {
      this.uploadedUrl.emit(url.url);
    });
  }
}
