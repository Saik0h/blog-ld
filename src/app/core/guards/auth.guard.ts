import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isLoggedIn$.pipe(
      take(1), // pega só o último valor e completa
      map((isLoggedIn) => {
        if (isLoggedIn) {
          return true; // pode acessar a rota
        } else {
          // redireciona para página de login se não estiver logado
          return this.router.createUrlTree(['/login']);
        }
      })
    );
  }
}