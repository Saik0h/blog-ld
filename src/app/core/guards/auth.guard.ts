import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../utils/types';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { isArrayLike } from 'rxjs/internal/util/isArrayLike';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private http = inject(HttpClient);
  private router = inject(Router);

  canActivate(){
    return true
  }
}
