import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    data: { animation: 'ListaEmails' },

    loadComponent: async () => {
      return import('./mail-list/mail-list.component').then(
        (m) => m.MailListComponent
      );
    },
  },
  {
    path: ':id',
    data: { animation: 'Email' },
    loadComponent: async () => {
      return import('./mail-detail/mail-detail.component').then(
        (m) => m.MailDetailComponent
      );
    },
  },
];
