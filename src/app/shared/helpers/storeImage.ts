import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '../../core/services/supabase.service';
import { User } from '../../core/utils/types';
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

  async uploadImage(e: any, user: User) {
    let file = e.target.files[0];
    const { data, error } = await this.supabase
      .getClient()
      .storage.from('images')
      .upload(user.id + '/', uuid(), file);

    if (data) {
      this.getImages(user);
    } else {
      console.log(error);
    }
  }
}
