import { Routes } from '@angular/router';

export const CONTACT_ROUTES: Routes = [
  {
    path: 'dashboard', children: [
        { path: '', loadComponent: () => import('../contact-dashboard/contact-dashboard.component').then(c => c.ContactDashboardComponent) },
        { path: 'create', loadComponent: () => import('../contact-create/contact-create.component').then(c => c.ContactCreateComponent) },
        { path: 'edit/:contactId', loadComponent: () => import('../contact-create/contact-create.component').then(c => c.ContactCreateComponent) }
    ]
  }
];
