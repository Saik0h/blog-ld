import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../../../core/services/auth.service';
import { MaterialService } from '../../../../../core/services/material.service';
import { Material } from '../../../../../core/utils/types';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { MaterialCardComponent } from '../material-card/material-card.component';
import { ResourceEmptyComponent } from '../../../shared/resource-empty/resource-empty.component';
import { RecursoTemporariamenteIndisponivelComponent } from '../../../shared/recurso-temporariamente-indisponivel/recurso-temporariamente-indisponivel.component';

@Component({
  selector: 'app-materiais-list-loader',
  imports: [
    LoadingComponent,
    MaterialCardComponent,
    ResourceEmptyComponent,
    RecursoTemporariamenteIndisponivelComponent,
  ],
  templateUrl: './materiais-list-loader.component.html',
  styleUrl: './materiais-list-loader.component.css',
})
export class MateriaisListLoaderComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly server = inject(MaterialService);

  public readonly materials = this.server.materials;
  public readonly isLoading = this.server.isLoading;
  public readonly error = this.server.hasError;
  public hasPermission = signal<boolean>(false);

  readonly hasMaterials = computed(() => {
    const list = this.materials();
    return list && list.length > 0;
  });

  deleteMaterialFn = (material: Material) => {
    this.deleteFunction(material.id);
  };

  ngOnInit() {
    this.server.loadAllMaterials();
    this.authService.getAuthorization().subscribe({
      next: (isAdmin: boolean) => this.hasPermission.set(isAdmin),
    });
  }

  deleteFunction = (id: string): void => {
    this.server.delete(+id).subscribe();
  };
}
