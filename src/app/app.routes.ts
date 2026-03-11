import { Routes } from '@angular/router';

import { Login } from './components/auth/login/login';
import { Signup } from './components/auth/signup/signup';

import { MainLayoutComponent } from './components/layout/main-layout';

import { AdminDashboardComponent } from './components/pages/admin-dashboard/admin-dashboard';
import { VerifyAlumniComponent } from './components/pages/verify-alumni/verify-alumni';
import { ManageAccountsComponent } from './components/pages/manage-accounts/manage-accounts';
import { AlumniRecordsComponent } from './components/pages/alumni-records/alumni-records';
import { ReportsComponent } from './components/pages/reports/reports';
import { EventsAnnouncementsComponent } from './components/pages/events-announcements/events-announcements';

import { AlumniDashboardComponent } from './components/pages/alumni-dashboard/alumni-dashboard';
import { AlumniProfileComponent } from './components/pages/alumni-profile/alumni-profile';
import { AlumniStatusComponent } from './components/pages/alumni-status/alumni-status';
import { JobOpportunitiesComponent } from './components/pages/job-opportunities/job-opportunities';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  { path: 'login', component: Login },
  { path: 'signup', component: Signup },

  {
    path: 'admin',
    component: MainLayoutComponent,
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

  {
    path: 'alumni',
    component: MainLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: AlumniDashboardComponent },
      { path: 'profile', component: AlumniProfileComponent },
      { path: 'status', component: AlumniStatusComponent },
      { path: 'events-announcements', component: EventsAnnouncementsComponent },
      { path: 'jobs', component: JobOpportunitiesComponent },
    ],
  },

  { path: '**', redirectTo: 'login' },
];