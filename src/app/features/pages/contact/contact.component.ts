import { Component, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MailPayload, Message } from '../../../core/utils/types';
import { InboxService } from '../../../core/services/inbox.service';
import { MessageSentModalComponent } from './message-sent.modal/message-sent.modal.component';
import { LoadingComponent } from '../shared/loading/loading.component';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, MessageSentModalComponent, LoadingComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  private readonly mailService: InboxService = inject(InboxService);
  public readonly isModalOpen = signal(false);
  public readonly isLoading = signal(false);
  public mailPayload = model<MailPayload>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  showModal = () => {
    this.isModalOpen.set(true)
  }
  onSubmit() {
    this.isLoading.set(true)
    this.mailService.postMail(this.mailPayload()).subscribe({
      next: () => {
        this.showModal()
      },
      error: (err) => throwError(() => { err }),
      complete: () => this.isLoading.set(false)
    });
  }
}
