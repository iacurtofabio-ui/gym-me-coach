import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'oggi' },
  {
    path: 'accesso',
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/accesso/accesso').then((m) => m.Accesso),
  },
  {
    path: 'registrazione',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./pages/registrazione/registrazione').then((m) => m.Registrazione),
  },
  {
    path: '',
    canActivateChild: [authGuard],
    children: [
      { path: 'oggi', loadComponent: () => import('./pages/oggi/oggi').then((m) => m.Oggi) },
      { path: 'piano', loadComponent: () => import('./pages/piano/piano').then((m) => m.Piano) },
      {
        path: 'progressi',
        loadComponent: () => import('./pages/progressi/progressi').then((m) => m.Progressi),
      },
      {
        path: 'alimentazione',
        loadComponent: () =>
          import('./pages/alimentazione/alimentazione').then((m) => m.Alimentazione),
      },
      { path: 'coach', loadComponent: () => import('./pages/coach/coach').then((m) => m.Coach) },
    ],
  },
  { path: '**', redirectTo: 'oggi' },
];
