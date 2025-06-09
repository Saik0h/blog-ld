import { Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout.component';
import { authGuard } from './core/guards/auth.guard';

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
        data: { animation: 'CurriculumPage' },
        path: 'curriculo',
        loadComponent: async () => {
          return import('./features/pages/curriculo/curriculo.component').then(
            (m) => m.CurriculoComponent
          );
        },
      },
      {
        path: 'profile',
        canActivate: [authGuard],
        data: { animation: 'ProfilePage' },
        loadChildren: async () => {
          return import('./features/pages/profile/profile-routes').then(
            (m) => m.routes
          );
        },
      },
      {
        path: 'materiais',
        data: { animation: 'MaterialsPage' },
        loadComponent: async () => {
          return import('./features/pages/materiais/materiais.component').then(
            (m) => m.MateriaisComponent
          );
        },
      },
      {
        path: 'cursos',
        data: { animation: 'CoursesPage' },
        loadComponent: async () => {
          return import('./features/pages/courses/courses.component').then(
            (m) => m.CoursesComponent
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
  {
    path: '**',
    data: { animation: 'NotFoundPage' },
    loadComponent: async () => {
      return import(
        './features/pages/shared/page-not-found/page-not-found.component'
      ).then((m) => m.PageNotFoundComponent);
    },
  },
];
