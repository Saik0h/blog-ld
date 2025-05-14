import { Component, computed, OnInit, signal } from '@angular/core';
import { User } from '../../core/types/types';
import { AuthService } from '../../core/services/auth/auth.service';
import { catchError, of, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  user = signal<User>({
    id: '',
    firstname: '',
    lastname: '',
    username: '',
    role: '',
  });

  loading = true;
  error: string | null = null;

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
   this.authService.validate().pipe(
      tap((res: any) => {
        const userId = res.sub;
        console.log(res)
        this.authService.getUser(userId).subscribe({
          next: (userData) => {
            this.user.set(userData);
            this.loading = false;
          },
          error: (err) => {
            console.error(err);
            this.error = 'Erro ao carregar dados do usuário.';
            this.loading = false;
          },
        });
      }),
   catchError((err) => {
        console.error('Erro ao validar usuário:', err);
        this.error = 'Você não está autenticado.';
        this.loading = false;
        return of(null); // necessário para o Observable continuar e não quebrar
      })
    ).subscribe(); // executa o fluxo
  }
}
