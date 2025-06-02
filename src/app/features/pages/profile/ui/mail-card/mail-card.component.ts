import { DatePipe } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { Mail } from '../../../../../core/utils/types';

@Component({
  selector: 'app-mail-card',
  imports: [DatePipe],
  templateUrl: './mail-card.component.html',
  styleUrls: ['./mail-card.component.css'],
})
export class MailCardComponent {
  @Input() mail: Mail = {
    id: '',
    subject: '',
    message: '',
    name: '',
    email: '',
    createdAt: '',
    read: false,
  };

  @Input() redirect = (id: string) => {};
  redirects() {
    this.redirect(this.mail.id);
  }
}
