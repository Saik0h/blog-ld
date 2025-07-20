import { Component, signal } from '@angular/core';
import { RecursoTemporariamenteIndisponivelComponent } from '../shared/recurso-temporariamente-indisponivel/recurso-temporariamente-indisponivel.component';
import { LoadingComponent } from '../shared/loading/loading.component';
import { MateriaisListLoaderComponent } from './ui/materiais-list-loader/materiais-list-loader.component';

@Component({
  selector: 'app-materiais',
  imports: [
    RecursoTemporariamenteIndisponivelComponent,
    LoadingComponent,
    MateriaisListLoaderComponent,
  ],
  templateUrl: './materiais.component.html',
  styleUrl: './materiais.component.css',
})
export class MateriaisComponent {
  public readonly title = signal('Materiais Gratuitos');
}
