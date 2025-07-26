import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { AuthStoreService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthStoreService);
  const router = inject(Router);

  return authService.status().pipe(
    map((isAuthenticated: boolean) => {
      return isAuthenticated ? true : router.createUrlTree(["auth"]);
    }),
    catchError(() => of(router.createUrlTree(["auth"])))
  );
};