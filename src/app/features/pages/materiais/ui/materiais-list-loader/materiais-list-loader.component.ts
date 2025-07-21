import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../../../core/services/auth.service';
import { Material } from '../../../../../core/utils/types';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { MaterialCardComponent } from '../material-card/material-card.component';
import { ResourceEmptyComponent } from '../../../shared/resource-empty/resource-empty.component';
import { UnavailableResourceComponent } from '../../../shared/resource-temporarily-unavailable/unavailable-resource.component';
import { MateriaisStoreService } from '../../data-access/materiais-store.service';

@Component({
  selector: 'app-materiais-list-loader',
  imports: [
    LoadingComponent,
    MaterialCardComponent,
    ResourceEmptyComponent,
    UnavailableResourceComponent,
  ],
  templateUrl: './materiais-list-loader.component.html',
  styleUrl: './materiais-list-loader.component.css',
})
export class MateriaisListLoaderComponent implements OnInit {
  private readonly server = inject(MateriaisStoreService);
  private readonly authService = inject(AuthService);

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
    this.authService.getAuthorization().subscribe({
      next: (isAdmin: boolean) => this.hasPermission.set(isAdmin),
    });

    this.server.initialize();
  }

  deleteFunction = (id: string): void => {
    this.server.delete(+id);
  };
}
