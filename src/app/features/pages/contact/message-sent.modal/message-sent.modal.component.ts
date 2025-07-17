import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-message-sent-modal',
  imports: [RouterLink],
  templateUrl: './message-sent.modal.component.html',
  styleUrl: './message-sent.modal.component.css',
})
export class MessageSentModalComponent implements OnInit {
  public isOpen = signal(false);

  @ViewChild('modalContent') modalContent!: ElementRef<HTMLDivElement>;

  ngOnInit() {
    // Nada aqui ainda
  }

  open() {
    this.isOpen.set(true);
    setTimeout(() => {
      this.modalContent?.nativeElement.focus();
    }, 0);
    document.addEventListener('keydown', this.handleKeyDown);
  }

  close() {
    this.isOpen.set(false);
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.close();
    }
  };
}
