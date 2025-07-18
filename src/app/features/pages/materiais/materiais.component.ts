import {
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { RecursoTemporariamenteIndisponivelComponent } from '../shared/recurso-temporariamente-indisponivel/recurso-temporariamente-indisponivel.component';
import { Material, Message } from '../../../core/utils/types';
import { MaterialService } from '../../../core/services/material.service';
import { LoadingComponent } from '../shared/loading/loading.component';
import { ResourceEmptyComponent } from '../shared/resource-empty/resource-empty.component';
import { MaterialCardComponent } from './ui/material-card/material-card.component';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-materiais',
  imports: [
    RecursoTemporariamenteIndisponivelComponent,
    LoadingComponent,
    ResourceEmptyComponent,
    MaterialCardComponent,
  ],
  templateUrl: './materiais.component.html',
  styleUrl: './materiais.component.css',
})
export class MateriaisComponent implements OnInit {
  public readonly title = signal('Materiais Gratuitos');

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
    this.deleteFunction(+material.id);
  };

  ngOnInit() {
    this.server.loadAllMaterials();
    this.authService.getAuthorization().subscribe({
      next: (isAdmin: boolean) => this.hasPermission.set(isAdmin),
    });
  }

  deleteFunction = (id: number) => {
    return this.server.delete(id).subscribe();
  };
}
