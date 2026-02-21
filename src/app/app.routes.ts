import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/login/login').then(m => m.Login),
  },

   {
  path: 'forgot-password',
  loadComponent: () =>
    import('./components/auth/forgot-password/forgot-password').then(
      m => m.ForgotPassword
    ),
},

  { path: '**', redirectTo: 'login' },
];