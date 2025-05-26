import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    data: { animation: 'ListaBlog' },

    loadComponent: async () => {
      return import('./blog-list/blog-list.component').then(
        (m) => m.BlogListComponent
      );
    },
  },
  {
    path: ':id',
    data: { animation: 'Blog' },
    loadComponent: async () => {
      return import('./blog-details/blog-details.component').then(
        (m) => m.BlogDetailComponent
      );
    },
  },
];
