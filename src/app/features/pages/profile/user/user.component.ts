import { Component, inject, signal } from '@angular/core';
import { User } from '../../../../core/utils/types';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { tap, catchError, of } from 'rxjs';

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

  ngOnInit(): void {
    this.authService
      .validate()
      .pipe(
        tap((res: any) => {
          const userId = res.sub;
          this.authService.getUser(userId).subscribe({
            next: (userData) => {
              this.user.set(userData);
              this.loading.set(false);
            },
            error: (err) => {
              console.error(err);
              this.error.set('Erro ao carregar dados do usuário.');
              this.loading.set(false);
            },
          });
        }),
        catchError((err) => {
          console.error('Erro ao validar usuário:', err);
          this.error.set('Você não está autenticado.');
          this.loading.set(false);
          return of(null); // necessário para o Observable continuar e não quebrar
        })
      )
      .subscribe(); // executa o fluxo
  }
  logout() {
    this.authService.logout();
  }
}
