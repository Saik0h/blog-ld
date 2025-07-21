import { inject, Injectable, signal } from '@angular/core';
import { MateriaisApiService } from './materiais-api.service';
import {
  Material,
  MaterialUpdatePayload,
  Message,
} from '../../../../core/utils/types';
import { finalize, Observable, pipe, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MateriaisStoreService {
  private readonly api = inject(MateriaisApiService);

  private _isLoading = signal<boolean>(false);
  private _hasError = signal<boolean>(false);
  private _materials = signal<Material[] | null>(null);

  public readonly isLoading = this._isLoading.asReadonly();
  public readonly hasError = this._hasError.asReadonly();
  public readonly materials = this._materials.asReadonly();

  initialize() {
    this._isLoading.set(true);
    this.api
      .getAllMaterials()
      .pipe(
        tap((m: Material[]) => this._materials.set(m)),
        finalize(() => this._isLoading.set(false))
      )
      .subscribe();
  }

  update(data: MaterialUpdatePayload): void {
    this._isLoading.set(true);
    this.api
      .update(data)
      .pipe(
        tap(() => this.initialize()),
        finalize(() => this._isLoading.set(false))
      )
      .subscribe();
  }

  delete(id: number): void {
    this._isLoading.set(true);
    this.api
      .delete(+id)
      .pipe(
        tap(() => this.initialize()),
        finalize(() => this._isLoading.set(false))
      )
      .subscribe();
  }
}
