import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, HeaderComponent, RouterModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
    private readonly router = inject(Router);

    public viewAllRequests(): void {
        this.router.navigate(['/requests']);
    }

    public registerNewUser(): void {
        this.router.navigate(['/create-user']);
    }

    public requestAccess(): void {
        this.router.navigate(['/request-access']);
    }

    public assignComputer(): void {
        this.router.navigate(['/assign-computer']);
    }
}
