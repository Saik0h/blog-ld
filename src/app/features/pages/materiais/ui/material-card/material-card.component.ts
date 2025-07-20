import { Component, Input } from '@angular/core';
import { Material } from '../../../../../core/utils/types';

@Component({
  selector: 'app-material-card',
  templateUrl: './material-card.component.html',
  styleUrl: './material-card.component.css',
})
export class MaterialCardComponent {
  @Input({ required: true }) material!: Material;
  @Input({ required: true }) canDelete!: boolean;
  @Input({ required: true }) delete = (id: string): void =>  {};

  deleteMaterial = () => {
    // this.delete(+this.material.id);
  };
}
