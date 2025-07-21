import { Component, signal } from '@angular/core';
import { UnavailableResourceComponent } from '../shared/resource-temporarily-unavailable/unavailable-resource.component';
import { LoadingComponent } from '../shared/loading/loading.component';
import { MateriaisListLoaderComponent } from './ui/materiais-list-loader/materiais-list-loader.component';

@Component({
  selector: 'app-materiais',
  imports: [
    UnavailableResourceComponent,
    LoadingComponent,
    MateriaisListLoaderComponent,
  ],
  templateUrl: './materiais.component.html',
  styleUrl: './materiais.component.css',
})
export class MateriaisComponent {
  public readonly title = signal('Materiais Gratuitos');
}
