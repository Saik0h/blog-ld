import { DatePipe } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { RouterLink, ActivatedRoute, Router } from "@angular/router";
import { throwError } from "rxjs";
import { InboxService } from "../../../../../../core/services/inbox.service";
import { Mail, Message } from "../../../../../../core/utils/types";
import { LoadingComponent } from "../../../../shared/loading/loading.component";
import { PageNotFoundComponent } from "../../../../shared/page-not-found/page-not-found.component";

@Component({
  selector: 'app-mail-detail',
  imports: [DatePipe, PageNotFoundComponent, LoadingComponent, RouterLink],
  templateUrl: './mail-detail.component.html',
  styleUrl: './mail-detail.component.css',
})
export class MailDetailComponent {
  private mailService = inject(InboxService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  isNotFound = signal(false);
  public readonly isLoading = signal<boolean>(true);
  public readonly mail = signal({
    id: '',
    name: '',
    email: '',
    subject: '',
    message: '',
    createdAt: '',
    read: false,
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.mailService.getOneMail(id).subscribe({
      next: (mail: Mail) => this.mail.set(mail),
      error: (err) => {
        this.isLoading.set(false);
        this.isNotFound.set(true);
        throwError(() => err)
      },
      complete: () => {
        if (!this.mail().read) {
          this.mailService.markMailAsRead(id).subscribe({
            next: (response: Message) => console.log(response),
            error: (err) => this.isLoading.set(false),
            complete: () => this.isLoading.set(false),
          });
        }
        this.isLoading.set(false);
      },
    });
  }

  deleteButtonClick = () => {
    this.isLoading.set(true)
    this.mailService.deleteMail(this.mail().id).subscribe({
      error: (err) => { 
        throwError(() => err) 
      this.isLoading.set(false)
      this.router.navigate(['/profile/inbox'])
      },
      complete: () => {
        this.isLoading.set(false)
        this.router.navigate(['/profile/inbox'])
      }
    });
  };
}
