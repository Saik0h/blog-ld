import { Component, inject, signal } from '@angular/core';
import { User } from '../../../../core/utils/types';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
user = signal<User>({
    id: '',
    profileImage: '',
    firstname: '',
    lastname: '',
    username: '',
    role: '',
  });

   loading = signal<boolean>(true);
  error = signal<string | null>(null);

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result;
        this.user.update((prevUser) => ({
          ...prevUser,
          profileImage: imageUrl as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  }
  
  private authService = inject(AuthService);
  
    uploadImage() {
      const fileInput = document.querySelector('#file-input') as HTMLInputElement;
      if (!fileInput) throw new Error('Elemento de entrada de arquivo não encontrado');
      const file = fileInput.files?.[0];
      if (!file) throw new Error('Nenhum arquivo selecionado');
      return this.authService.uploadImage(file);
    }

  

}
