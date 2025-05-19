import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: async () => {
      return import('./artigo-list/artigo-list.component').then(
        (m) => m.ArtigoListComponent
      );
    },
  },
  {
    path: ':id',
    loadComponent: async () => {
      return import('./artigo-detail/artigo-detail.component').then(
        (m) => m.ArtigoDetailComponent
      );
    },
  },
];
