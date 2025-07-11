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
  @Input({required: true}) mail: Mail | null = null;

  @Input({required: true}) redirect = (id: string) => {};
  redirects() {
    this.redirect(this.mail!.id);
  }
}
