import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/api/images'; // Adjust based on your NestJS API endpoint

  /**
   * Uploads an image file to the backend (NestJS).
   * @param file The image file to upload.
   * @param folder The folder/category to store the image.
   */
  uploadImage(file: File, folder: string): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    return this.http.post<{ url: string }>(`${this.baseUrl}/upload`, formData, {
      withCredentials: true,
    });
  }

  /**
   * Gets a public URL for an image stored on Supabase or backend.
   * @param imagePath The path to the image in storage.
   */
  getImageUrl(imagePath: string): string {
    const supabaseUrl =
      'https://your-supabase-url.storage/v1/object/public/images/';
    return `${supabaseUrl}${imagePath}`;
  }

  /**
   * Deletes an image from the backend (or triggers deletion on Supabase).
   * @param imagePath The image path to delete.
   */
  deleteImage(imagePath: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/delete?path=${encodeURIComponent(imagePath)}`
    );
  }

  /**
   * Fetches all images (optional, depending on your use case).
   */
  getAllImages(): Observable<{ id: string; url: string }[]> {
    return this.http.get<{ id: string; url: string }[]>(`${this.baseUrl}/all`);
  }
}
