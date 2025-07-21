import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { PdfService } from './pdf.service';

@Component({
  selector: 'app-pdf-uploader',
  imports: [],
  template: ` <input type="file" (change)="upload($event)" />
    @if(pdfSrc()){
    <iframe [src]="pdfSrc()!" width="100%" height="200px"></iframe>
    }`,
  styleUrl: './pdf-uploader.component.css',
})
export class PdfUploaderComponent {
  @Output() uploadedUrl = new EventEmitter<string>();

  private pdfService: PdfService = inject(PdfService);
  public pdfSrc = signal<string | null>(null);

  upload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      this.pdfSrc.set(result);
    };

    reader.readAsDataURL(file);

    this.pdfService.uploadPdf(file).subscribe((access: { url: string }) => {
      this.uploadedUrl.emit(access.url);
    });
  }
}
