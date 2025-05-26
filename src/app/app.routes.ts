import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './core/components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    data: { animation: 'LayoutComponent' },
    component: LayoutComponent,
    children: [
      {
        path: 'contato',
        data: { animation: 'ContactPage' },
        loadComponent: async () => {
          return import('./features/pages/contact/contact.component').then(
            (m) => m.ContactComponent
          );
        },
      },
      {
        path: 'blogs',
        data: { animation: 'BlogsPage' },
        loadChildren: async () => {
          return import('./features/pages/blogs/blogs-routes').then(
            (m) => m.routes
          );
        },
      },
      {
        path: 'artigos',
        data: { animation: 'ArticlesPage' },
        loadChildren: async () => {
          return import('./features/pages/artigos/artigos-routes').then(
            (m) => m.routes
          );
        },
      },
      {
        path: 'curriculo',
        data: { animation: 'CurriculumPage' },
        loadComponent: async () => {
          return import('./features/pages/curriculo/curriculo.component').then(
            (m) => m.CurriculoComponent
          );
        },
      },
      {
        path: 'perfil',
        data: { animation: 'ProfilePage' },
        loadComponent: async () => {
          return import('./features/pages/profile/user/user.component').then(
            (m) => m.UserComponent
          );
        },
      },
      {
        path: '',
        data: { animation: 'HomePage' },
        loadComponent: async () => {
          return import('./features/pages/homepage/homepage.component').then(
            (m) => m.HomepageComponent
          );
        },
      },
    ],
  },
  {
    path: 'auth',
    data: { animation: 'AuthLayout' },
    loadChildren: async () => {
      return import('./features/auth/auth-routes').then((m) => m.routes);
    },
  },
];
