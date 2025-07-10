import { Component, EventEmitter, inject, Output } from '@angular/core';
import { PdfService } from '../../../../core/services/pdf.service';

@Component({
  selector: 'app-pdf-uploader',
  imports: [],
  template: ` <input type="file" (change)="upload($event)" /> `,
  styleUrl: './pdf-uploader.component.css',
})
export class PdfUploaderComponent {
  @Output() uploadedUrl = new EventEmitter<string>();

  private pdfService: PdfService = inject(PdfService);

  upload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.pdfService.uploadPdf(file).subscribe((access: {url: string}) => {
      this.uploadedUrl.emit(access.url);
    });
  }
}
