import { inject, Injectable, signal } from '@angular/core';
import { ArtigoApiService } from './artigo.api.service';
import { Artigo } from '../../../../core/utils/types';
import { catchError, finalize, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtigoListStore {
  private readonly api = inject(ArtigoApiService);

  private _artigos = signal<Artigo[] | null>(null);
  public readonly artigos = this._artigos.asReadonly();

  private _isLoading = signal<boolean>(false);
  public readonly isLoading = this._isLoading.asReadonly();

  loadAllArticles(): void {
    this._isLoading.set(true);
    const obs = this.api.getAllArticles().pipe(
      tap((artigos: Artigo[]) => this._artigos.set(artigos)),
      catchError((error) => throwError(() => error)),
      finalize(() => this._isLoading.set(false))
    );

    obs.subscribe();
  }

  get hasError() {
    return this._artigos() === null;
  }
}
