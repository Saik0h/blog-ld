import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MailPayload, Message } from '../../../core/utils/types';
import { InboxService } from '../../../core/services/inbox.service';
import { MessageSentModalComponent } from './message-sent.modal/message-sent.modal.component';
import { LoadingComponent } from '../shared/loading/loading.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, MessageSentModalComponent, LoadingComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  @ViewChild(MessageSentModalComponent) modal!: MessageSentModalComponent;
  private readonly mailService: InboxService = inject(InboxService);
  public readonly isModalOpen = signal(false);
  public readonly isLoading = signal(false);
  public mailPayload = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  showModal = () => {
    this.isModalOpen.set(true);
  };
  onSubmit() {
    this.isLoading.set(true);
    const payload: MailPayload = this.mailPayload.value as MailPayload;
    this.mailService.postMail(payload).subscribe({
      next: () => {},
      complete: () => this.isLoading.set(false),
    });
    this.mailPayload.reset();
    this.modal.open();
  }
}
