import { Routes } from '@angular/router';

import { Login } from './components/auth/login/login';
import { Admin } from './components/pages/admin/admin';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  
  { path: 'login', component: Login },
  { path: 'admin', component: Admin },
  { path: '**', redirectTo: 'login' },
];