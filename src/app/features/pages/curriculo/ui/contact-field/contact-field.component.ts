import { Component, inject, model, OnInit, signal } from '@angular/core';
import { ContactFieldStoreService } from '../../data-access/store/contact-field-store.service';
import {
  CreateContactInfoPayload,
  UpdateContactInfoPayload,
} from '../../../../../core/utils/types';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../../../shared/loading/loading.component';

@Component({
  selector: 'app-contact-field',
  imports: [FormsModule, LoadingComponent],
  templateUrl: './contact-field.component.html',
  styleUrl: './contact-field.component.css',
})
export class ContactFieldComponent implements OnInit {
  public newItemLabel = model('');
  public newItemLink = model('');
  public newItemPlatform = model('');

  public isEditModeOn = signal(false);
  private readonly storeService = inject(
    ContactFieldStoreService
  );

  public readonly isLoading = this.storeService.isLoading;
  public readonly contactItems =
    this.storeService.contactInfo;

  ngOnInit(): void {
    this.storeService.initialize();
  }

  public createContactItem = (body: CreateContactInfoPayload) => {
    this.storeService.createContactInfo(body).subscribe();
  };

  public updateContactItem = (item: UpdateContactInfoPayload) => {
    this.storeService.updateContactInfo(item).subscribe();
  };

  public deleteContactItem = (id: number) => {
    this.storeService.deleteContactInfo(id).subscribe();
  };
}
