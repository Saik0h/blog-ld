import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap, finalize } from 'rxjs';
import { Blog } from '../../../../core/utils/types';
import { BlogApiService } from '../../blogs/data-access/blog.api.service';

@Injectable({
  providedIn: 'root'
})
export class BlogStoreService {
  // Dependencies
  private readonly api = inject(BlogApiService);
  private router = inject(Router);

  // Signals for state management
  private _blog = signal<Blog | null>(null);
  public readonly blog = this._blog.asReadonly();

  private _isLoading = signal<boolean>(false);
  public readonly isLoading = this._isLoading.asReadonly();

  loadBlog(id: string): void {
    this._isLoading.set(true);
    
    const obs = this.api.getOneBlog(id).pipe(
      tap((blog: Blog) => this._blog.set(blog)),
      finalize(() => this._isLoading.set(false))
    )

    obs.subscribe();
  }

  delete(id: string): void {
    this._isLoading.set(true);

    const obs = this.api.deleteBlog(id).pipe(
      tap(() => {
        this._blog.set(null);
        this.router.navigate(['/blogs']);
      }),
      finalize(() => this._isLoading.set(false))
    );

    obs.subscribe();
  }

  get hasError() {
    return this._blog() === null;
  }
}
