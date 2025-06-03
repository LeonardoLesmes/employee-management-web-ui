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
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
