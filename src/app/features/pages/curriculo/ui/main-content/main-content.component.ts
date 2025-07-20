import { Component, inject } from '@angular/core';
import { MainInfoStoreService } from '../../data-access/store/main-info-store.service';

@Component({
  selector: 'app-main-content',
  imports: [],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css',
})
export class MainContentComponent {
  private readonly curriculumContentStateService = inject(MainInfoStoreService);
  readonly personalInfo = this.curriculumContentStateService.curriculumInfo;

}
