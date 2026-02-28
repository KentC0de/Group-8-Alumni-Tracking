// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { Login } from './components/auth/login/login';
import { Signup } from './components/auth/signup/signup';

import { AdminLayout } from './components/layout/admin-layout';
import { AdminDashboardComponent } from './components/pages/admin-dashboard/admin-dashboard';
import { VerifyAlumniComponent } from './components/pages/verify-alumni/verify-alumni';
import { ManageAccountsComponent } from './components/pages/manage-accounts/manage-accounts';
import { AlumniRecordsComponent } from './components/pages/alumni-records/alumni-records';
import { ReportsComponent } from './components/pages/reports/reports';
import { EventsAnnouncementsComponent } from './components/pages/events-announcements/events-announcements';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  { path: 'login', component: Login },
  { path: 'signup', component: Signup },

  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'verify-alumni', component: VerifyAlumniComponent },
      { path: 'manage-accounts', component: ManageAccountsComponent },
      { path: 'alumni-records', component: AlumniRecordsComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'events-announcements', component: EventsAnnouncementsComponent },
    ],
  },

  { path: '**', redirectTo: 'login' },
];