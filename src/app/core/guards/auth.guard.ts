import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const router = inject(Router);
  const isAuthenticated = inject(AuthService).isAuthenticated();

  // if (isAuthenticated) {
  //   console.log(isAuthenticated)
  //   return true;
  // } else {
  //   console.log('Unauthorized');
  //   return router.createUrlTree(['auth/login']);
  // }
  return true
};