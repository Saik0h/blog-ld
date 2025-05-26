import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports:[FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  contact = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  onSubmit() {
    console.log('Contato enviado:', this.contact);
    // Aqui você pode enviar para um serviço ou exibir uma mensagem
    alert('Mensagem enviada com sucesso!');
    this.contact = {
      name: '',
      email: '',
      subject: '',
      message: '',
    };
  }
}
