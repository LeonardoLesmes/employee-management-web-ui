import { Routes } from '@angular/router';
import { tokenGuard } from './core/guards/token/token.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: 'dashboard',
        canActivate: [tokenGuard],
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    },    {
        path: 'create-user',
        canActivate: [tokenGuard],
        loadComponent: () => import('./pages/create-user/create-user.component').then(m => m.CreateUserComponent),
    },
    {
        path: 'request-access',
        canActivate: [tokenGuard],
        loadComponent: () => import('./pages/request-access/request-access.component').then(m => m.RequestAccessComponent),
    },
    {
        path: 'requests',
        canActivate: [tokenGuard],
        loadComponent: () => import('./pages/requests/requests.component').then(m => m.RequestsComponent),
    },
    
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
