import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MailPayload, Message } from '../../../core/utils/types';
import { InboxService } from '../../../core/services/inbox.service';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  private readonly mailService: InboxService = inject(InboxService);
  public mailPayload = model<MailPayload>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  onSubmit() {
    this.mailService.postMail(this.mailPayload()).subscribe({
      next: (response: Message) => console.log(response),
    });
  }
}
