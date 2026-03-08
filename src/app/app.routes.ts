import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'doctors',
    loadComponent: () => import('./components/doctor-list/doctor-list').then(m => m.DoctorListComponent)
  },
  {
    path: 'appointments',
    loadComponent: () => import('./components/appointment-form/appointment-form').then(m => m.AppointmentFormComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'appointments/:doctorId',
    loadComponent: () => import('./components/appointment-form/appointment-form').then(m => m.AppointmentFormComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/patient-dashboard/patient-dashboard').then(m => m.PatientDashboardComponent),
    canActivate: [AuthGuard],
    data: { roles: ['patient', 'receptionist'] }
  },
  {
    path: 'doctor-dashboard',
    loadComponent: () => import('./components/doctor-dashboard/doctor-dashboard').then(m => m.DoctorDashboardComponent),
    canActivate: [AuthGuard],
    data: { roles: ['doctor', 'receptionist'] }
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register').then(m => m.RegisterComponent)
  },
  { path: '**', redirectTo: '/home' }
];