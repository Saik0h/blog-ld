import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  BlogCreatePayload,
  PostCreatedResponse,
  ArtigoCreatePayload,
  MaterialCreatePayload,
  Message,
  CourseCreatePayload,
} from '../../../../core/utils/types';
import { PostApiService } from './post-api.service';
import { Observable, tap, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly api = inject(PostApiService);
  private readonly router = inject(Router);

  private _isLoading = signal(false);
  public readonly isLoading = this._isLoading.asReadonly;

  private _hasError = signal(false);
  public readonly hasError = this._hasError.asReadonly;

  public createBlog(data: BlogCreatePayload): Observable<PostCreatedResponse> {
    this._isLoading.set(true);

    return this.api.createBlog(data).pipe(
      tap((b) => this.router.navigate(['blogs/' + b.id])),
      finalize(() => this._isLoading.set(false))
    );
  }

  public createArtigo(
    data: ArtigoCreatePayload
  ): Observable<PostCreatedResponse> {
    this._isLoading.set(true);
    return this.api.createArtigo(data).pipe(
      tap((a) => this.router.navigate(['artigos/' + a.id])),
      finalize(() => this._isLoading.set(false))
    );
  }

  public createMaterial(data: MaterialCreatePayload): Observable<Message> {
    this._isLoading.set(true);

    return this.api.createMaterial(data).pipe(
      tap((res: Message) => this.router.navigate(['materiais'])),
      finalize(() => this._isLoading.set(false))
    );
  }

  public createCurso = (data: CourseCreatePayload): Observable<Message> => {
    this._isLoading.set(true);
    return this.api.createCurso(data).pipe(
      tap((res: Message) => this.router.navigate(['cursos'])),
      finalize(() => this._isLoading.set(false))
    );
  };
}
