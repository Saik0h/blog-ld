import { inject, Injectable, signal } from '@angular/core';
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
import { catchError, EMPTY, finalize, Observable, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  baseUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);
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
    const url = this.baseUrl + '/blogs';
    return this.http
      .post<PostCreatedResponse>(url, data, { withCredentials: true })
      .pipe(
        tap((res: PostCreatedResponse) =>
          this.router.navigate(['blogs/' + res.id])
        ),
        finalize(() => this._isLoading.set(false))
      );
  };

  public createArtigo = (
    data: ArtigoCreatePayload
  ): Observable<PostCreatedResponse> => {
    this._isLoading.set(true);
    const url = this.baseUrl + '/articles';
    return this.http
      .post<PostCreatedResponse>(url, data, { withCredentials: true })
      .pipe(
        tap((art: PostCreatedResponse) => {
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
