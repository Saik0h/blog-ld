import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { Blog, BlogUpdatePayload, Message } from '../../../../core/utils/types';

@Injectable({
  providedIn: 'root',
})
export class BlogApiService {
  private readonly http = inject(HttpClient);

  private readonly url = environment.apiUrl + '/blogs';

  GetAllBlogs = (): Observable<Blog[]> => {
    return this.http.get<Blog[]>(this.url, { withCredentials: true });
  };

  getOneBlog = (id: string): Observable<Blog> => {
    return this.http.get<Blog>(`${this.url}/${id}`, { withCredentials: true });
  };

  updateBlog = (data: BlogUpdatePayload): Observable<Message> => {
    return this.http.patch<Message>(`${this.url}/${data.id}`, {
      withCredentials: true,
    });
  };

  deleteBlog = (id: string): Observable<Message> => {
    return this.http.delete<Message>(`${this.url}/${id}`, {
      withCredentials: true,
    });
  };
}
