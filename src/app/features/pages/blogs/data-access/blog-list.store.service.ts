import { inject, Injectable, signal } from '@angular/core';
import { tap, catchError, throwError, finalize } from 'rxjs';
import { Blog } from '../../../../core/utils/types';
import { BlogApiService } from './blog.api.service';

@Injectable({
  providedIn: 'root',
})
export class BlogListStoreService {
  private readonly api = inject(BlogApiService);

  private _blogs = signal<Blog[] | null>(null);
  public readonly blogs = this._blogs.asReadonly();

  private _isLoading = signal<boolean>(false);
  public readonly isLoading = this._isLoading.asReadonly();

  loadAllBlogs(): void {
    this._isLoading.set(true);
    const obs = this.api.GetAllBlogs().pipe(
      tap((blog: Blog[]) => this._blogs.set(blog)),
      catchError((error) => throwError(() => error)),
      finalize(() => this._isLoading.set(false))
    );

    obs.subscribe();
  }

  get hasError() {
    return this._blogs() === null;
  }
}
