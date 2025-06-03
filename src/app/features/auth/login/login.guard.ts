import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuthenticated = authService.isAuthenticated()
  if (!isAuthenticated) {
    console.log(isAuthenticated)
    return true;
  } else {
    router.navigate(['profile']);
    return false;
  }
  return true
};
