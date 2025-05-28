import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog, Artigo, Post } from '../utils/types';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly http = inject(HttpClient);
  private readonly url = 'http://localhost:3000/api/posts';

  getBlogs(): Observable<Blog[]> {
    return this.http.get(`${this.url}/blogs`) as Observable<Blog[]>;
  }

  getArtigos(): Observable<Artigo[]> {
    return this.http.get(`${this.url}/artigos`) as Observable<Artigo[]>;
  }

  getOnePost(id: string): Observable<Post> {
    return this.http.get(`${this.url}/${id}`) as Observable<Post>;
  }
}
