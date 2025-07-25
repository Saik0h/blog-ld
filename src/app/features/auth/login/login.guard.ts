import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { map, catchError, of } from "rxjs";
import { AuthStoreService } from "../../../core/services/auth/auth.service";

export const loginGuard: CanActivateFn = (route, state) => { 
  const authService = inject(AuthStoreService);
  const router = inject(Router);

  return authService.status().pipe(
    map((isAuthenticated: boolean) => {
      return isAuthenticated ? router.createUrlTree(["profile"]) : true;
    }),
    catchError(() => of(true))
  );
};