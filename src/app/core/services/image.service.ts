import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl+ '/images';
  private _isLoading = signal<boolean>(false);
  public isLoading = this._isLoading.asReadonly;
  
  uploadImage(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<{ url: string }>(`${this.baseUrl}/upload`, formData, {
      withCredentials: true,
    });
  }

  getImageUrl(imagePath: string): string {
    const supabaseUrl =
      'https://your-supabase-url.storage/v1/object/public/images/';
    return `${supabaseUrl}${imagePath}`;
  }

  deleteImage(imagePath: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/delete?path=${encodeURIComponent(imagePath)}`
    );
  }

  getAllImages(): Observable<{ id: string; url: string }[]> {
    return this.http.get<{ id: string; url: string }[]>(`${this.baseUrl}/all`);
  }
}
