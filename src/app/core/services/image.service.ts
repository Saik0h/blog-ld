import { inject, Injectable } from '@angular/core';
import { User } from '../utils/types';
import { SupabaseService } from './supabase.service';
import { v7 as uuid } from 'uuid';
@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private readonly supabase = inject(SupabaseService);

  async getImages(user: User) {
    const { data, error } = await this.supabase
      .getClient()
      .storage.from('images')
      .list(user.id + '/', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      });

    if (data !== null) {
      console.log(data);
      return data;
    } else {
      console.log(error);
      return;
    }
  }

  async uploadImage(file: File) {
    const { data, error } = await this.supabase
      .getClient()
      .storage.from('images')
      .upload(`public/${file.name}`, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Error uploading:', error.message);
    } else {
      console.log('Upload successful:', data);
    }
  }
}
