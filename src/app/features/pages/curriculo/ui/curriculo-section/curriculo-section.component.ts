import { TitleCasePipe } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import {
  CreateFieldPayload,
  Field,
  FieldItem,
  UpdateFieldPayload,
} from '../../../../../core/utils/types';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { FieldStoreService } from '../../data-access/store/field-store.service';

@Component({
  selector: 'app-curriculo-section',
  imports: [FormsModule],
  templateUrl: './curriculo-section.component.html',
  styleUrl: './curriculo-section.component.css',
})
export class CurriculoSectionComponent {
  private readonly storeService = inject(FieldStoreService);
  public readonly isLoading = this.storeService.isLoading;
}
