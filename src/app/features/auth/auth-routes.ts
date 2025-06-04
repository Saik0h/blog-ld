import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { loginGuard } from './login/login.guard';

export const routes: Routes = [
  {
    path: '',
    data: { animation: 'Auth' },
    loadComponent: async () => {
      return import('./layout.component').then((m) => m.LayoutComponent);
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        canActivate:[loginGuard],
        data: { animation: 'AuthLoginPage' },
        loadComponent: () =>
          import('./login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'registrar',
        canActivate:[authGuard],
        data: { animation: 'AuthRegisterPage' },
        loadComponent: () =>
          import('./register/register.component').then(
            (m) => m.RegisterComponent
          ),
      },
    ],
  },
];
