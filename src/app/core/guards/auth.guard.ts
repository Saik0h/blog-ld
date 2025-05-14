import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { catchError, map, of, tap } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.validate().pipe(
    map(()=> true),
    catchError(()=>{
        return authService.validateCurrent().pipe(
            tap((tokens: any)=>{
                localStorage.setItem('token', tokens.accessToken)
                localStorage.setItem('refreshToken', tokens.refreshToken)
            }),
            map(()=> true),
            catchError(()=>{
                router.navigate(['/login']);
                return of(false)
            })
        )
    })
  )
};
