import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const router = inject(Router);
  const isLoggedIn = inject(AuthService).isAuthenticated()

  // if (isLoggedIn) {
  //   console.log(isLoggedIn)
  //   return true;
  // } else {
  //   console.log(isLoggedIn)
  //   return router.createUrlTree(['auth/login']);
  // }
  return true
};