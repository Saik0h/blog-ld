import { inject, Injectable, signal } from '@angular/core';
import { BlogService } from './blog.service';
import { ArtigoService } from './artigo.service';
import { CourseService } from './curso.service';
import { MaterialService } from './material.service';
import {
  ArtigoCreatePayload,
  BlogCreatePayload,
  CourseCreatePayload,
  MaterialCreatePayload,
  Message,
  PostCreatedResponse,
} from '../utils/types';
import { catchError, EMPTY, finalize, Observable, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly blogService = inject(BlogService);
  private readonly articleService = inject(ArtigoService);
  private readonly courseService = inject(CourseService);
  private readonly materialService = inject(MaterialService);
  private readonly errorService = inject(ErrorService);
  private readonly router = inject(Router);

  private _isLoading = signal(false);
  public readonly isLoading = this._isLoading.asReadonly;

  private _hasError = signal(false);
  public readonly hasError = this._hasError.asReadonly;

  private handleHttpError = (err: HttpErrorResponse) => {
    this.errorService.handleHTTPError(err);
    this._hasError.set(true);
    return EMPTY;
  };

  public createBlog = (
    data: BlogCreatePayload
  ): Observable<PostCreatedResponse> => {
    this._isLoading.set(true);
    return this.blogService.create(data).pipe(
      tap((res: PostCreatedResponse) => {
        this.router.navigate(['blogs/' + res.id]);
      }),
      catchError(this.handleHttpError),
      finalize(() => this._isLoading.set(false))
    );
  };

  public createArtigo = (
    data: ArtigoCreatePayload
  ): Observable<PostCreatedResponse> => {
    this._isLoading.set(true);
    return this.articleService.create(data).pipe(
      tap((art: PostCreatedResponse) => {
        console.log(art);
        this.router.navigate([('artigos/' + art.id) as string]);
      }),
      catchError(this.handleHttpError),
      finalize(() => this._isLoading.set(false))
    );
  };

  public createMaterial = (
    data: MaterialCreatePayload
  ): Observable<Message> => {
    this._isLoading.set(true);
    return this.materialService.create(data).pipe(
      tap((res: Message) => this.router.navigate(['materiais'])),
      catchError(this.handleHttpError),
      finalize(() => this._isLoading.set(false))
    );
  };

  public createCurso = (data: CourseCreatePayload): Observable<Message> => {
    this._isLoading.set(true);
    return this.courseService.create(data).pipe(
      tap((res: Message) => this.router.navigate(['cursos'])),
      catchError(this.handleHttpError),
      finalize(() => this._isLoading.set(false))
    );
  };
}
