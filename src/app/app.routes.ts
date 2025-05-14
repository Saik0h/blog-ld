import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./components/homepage/homepage.component').then(
        (m) => m.HomepageComponent
      );
    },
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent
      );
    },
  },
  {
    path: 'register',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./features/auth/register/register.component').then(
        (m) => m.RegisterComponent
      );
    },
  },
  {
    path: 'contato',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./components/contact/contact.component').then(
        (m) => m.ContactComponent
      );
    },
  },
  {
    path: 'about',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./components/about/about.component').then(
        (m) => m.AboutComponent
      );
    },
  },
  {
    path: 'blogs',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./features/postagens/pages/post/post.component').then(
        (m) => m.PostComponent
      );
    },
  },
  {
    path: 'artigos',
    pathMatch: 'full',
    loadComponent: () => {
      return import(
        './features/postagens/components/artigo/artigo.component'
      ).then((m) => m.ArtigoComponent);
    },
  },
  {
    path: 'curriculo',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./components/curriculo/curriculo.component').then(
        (m) => m.CurriculoComponent
      );
    },
  },
  {
    path: 'perfil',
    pathMatch: 'full',
    canActivate: [authGuard],
    loadComponent: () => {
      return import('./features/user/user.component').then(
        (m) => m.UserComponent
      );
    },
  },
];
