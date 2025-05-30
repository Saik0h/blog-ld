import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        data: { animation: 'ProfilePage' },

        loadComponent: async () => {
            return import('./profile.component').then(
                (m) => m.ProfileComponent
            );
        },
    },
    {
        path: 'inbox',
        data: { animation: 'InboxPage' },
        loadComponent: async () => {
            return import('./inbox/mail-list/mail-list.component').then(
                (m) => m.MailListComponent
            );
        },

    }, {
        path: 'inbox/:id',
        data: { animation: 'InboxDetailPage' },
        loadComponent: async () => {
            return import('./inbox/mail-detail/mail-detail.component').then(
                (m) => m.MailDetailComponent
            );
        },

    },
];
