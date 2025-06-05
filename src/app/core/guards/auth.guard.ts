import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.status().pipe(
    map((isAuthenticated: boolean) => {
      return isAuthenticated ? true : router.createUrlTree(["auth"]);
    }),
    catchError(() => of(router.createUrlTree(["auth"])))
  );
};