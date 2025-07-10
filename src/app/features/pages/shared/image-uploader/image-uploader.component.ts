import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ImageService } from '../../../../core/services/image.service';

@Component({
  selector: 'app-image-uploader',
  imports: [],
  template: ` <input type="file" (change)="upload($event)" /> `,
  styleUrl: './image-uploader.component.css',
})
export class ImageUploaderComponent {
  @Output() uploadedUrl = new EventEmitter<string>();

  private imageService: ImageService = inject(ImageService);

  upload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.imageService.uploadImage(file).subscribe((url) => {
      this.uploadedUrl.emit(url.url);
    });
  }
}
