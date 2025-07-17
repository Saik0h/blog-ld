import { inject, Injectable, signal } from '@angular/core';
import { Artigo } from '../../../../core/utils/types';
import { ArtigoApiService } from './artigo.api.service';
import { Router } from '@angular/router';
import { finalize, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtigoDetailStore {
  // Dependencies
  private readonly api = inject(ArtigoApiService);
  private router = inject(Router);

  // Signals for state management
  private _artigo = signal<Artigo | null>(null);
  public readonly artigo = this._artigo.asReadonly();

  private _isLoading = signal<boolean>(false);
  public readonly isLoading = this._isLoading.asReadonly();

  loadArticle(id: string): void {
    this._isLoading.set(true);
    
    const obs = this.api.getOneArticle(id).pipe(
      tap((artigo: Artigo) => this._artigo.set(artigo)),
      finalize(() => this._isLoading.set(false))
    )

    obs.subscribe();
  }

  delete(id: string): void {
    this._isLoading.set(true);

    const obs = this.api.delete(id).pipe(
      tap(() => {
        this._artigo.set(null);
        this.router.navigate(['/artigos']);
      }),
      finalize(() => this._isLoading.set(false))
    );

    obs.subscribe();
  }

  get hasError() {
    return this._artigo() === null;
  }
}
