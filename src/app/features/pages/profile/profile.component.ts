import { Component } from '@angular/core';
import { UserProfileCardComponent } from './ui/user-profile-card/user-profile-card.component';
import { MailListComponent } from './inbox/mail-list/mail-list.component';

@Component({
  selector: 'app-profile',
  imports: [UserProfileCardComponent, MailListComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
