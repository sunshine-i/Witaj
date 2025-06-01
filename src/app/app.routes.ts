import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: { animation: 'home' },
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'section/:slug',
    data: { animation: 'section' },
    loadComponent: () =>
      import('./features/section-detail/section-detail.component').then(
        m => m.SectionDetailComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
