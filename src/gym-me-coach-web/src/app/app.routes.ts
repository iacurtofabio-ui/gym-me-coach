import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'oggi' },
  { path: 'oggi', loadComponent: () => import('./pages/oggi/oggi').then((m) => m.Oggi) },
  { path: 'piano', loadComponent: () => import('./pages/piano/piano').then((m) => m.Piano) },
  {
    path: 'progressi',
    loadComponent: () => import('./pages/progressi/progressi').then((m) => m.Progressi),
  },
  {
    path: 'alimentazione',
    loadComponent: () => import('./pages/alimentazione/alimentazione').then((m) => m.Alimentazione),
  },
  { path: 'coach', loadComponent: () => import('./pages/coach/coach').then((m) => m.Coach) },
  { path: '**', redirectTo: 'oggi' },
];
