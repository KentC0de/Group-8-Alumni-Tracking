import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Adminlogin } from './components/auth/adminlogin/adminlogin';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'admin-login', component: Adminlogin },
];
