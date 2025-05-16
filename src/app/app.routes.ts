import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./features/homepage/homepage.component').then(
        (m) => m.HomepageComponent
      );
    },
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./features/login/login.component').then(
        (m) => m.LoginComponent
      );
    },
  },
  {
    path: 'register',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./features/register/register.component').then(
        (m) => m.RegisterComponent
      );
    },
  },
  {
    path: 'contato',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./features/contact/contact.component').then(
        (m) => m.ContactComponent
      );
    },
  },
  {
    path: 'about',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./features/about/about.component').then(
        (m) => m.AboutComponent
      );
    },
  },
  {
    path: 'blogs',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./features/blogs/blogs.component').then(
        (m) => m.BlogsComponent
      );
    },
  },
  {
    path: 'artigos',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./features/artigos/artigos.component').then(
        (m) => m.ArtigosComponent
      );
    },
  },
  {
    path: 'curriculo',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./features/curriculo/curriculo.component').then(
        (m) => m.CurriculoComponent
      );
    },
  },
  {
    path: 'perfil',
    pathMatch: 'full',
    canActivate: [authGuard],
    loadComponent: () => {
      return import('./features/profile/profile.component').then(
        (m) => m.ProfileComponent
      );
    },
  },
];
