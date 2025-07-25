import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: { animation: 'ListaArtigo' },
    loadComponent: async () => {
      return import('./ui/list/artigo-list.component').then(
        (m) => m.ArtigoListComponent
      );
    },
  },
  {
    path: ':id',
    data: { animation: 'Artigo' },
    loadComponent: async () => {
      return import('./ui/detail/artigo-detail.component').then(
        (m) => m.ArtigoDetailComponent
      );
    },
  },
];
