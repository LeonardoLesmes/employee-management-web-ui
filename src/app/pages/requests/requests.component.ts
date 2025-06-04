import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { RequestService } from '../../core/services/request/request.service';
import { RequestRes } from '../../core/models/request-res';
import { FormartedData } from './models/formated-data';
import { StorageService } from '../../core/services/storage/storage.service';
import { SessionUser } from '../../core/models/manager/session.model';
import { ReqStatus } from './models/req-status';

@Component({
    selector: 'app-requests',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatCardModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatInputModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        HeaderComponent,
    ],
    providers: [RequestService],
    templateUrl: './requests.component.html',
    styleUrl: './requests.component.scss',
})
export class RequestsComponent implements OnInit {
    public readonly dataSource = computed(() => this.formatData());
    public readonly loading = signal<boolean>(false);

    private readonly requests = signal<RequestRes>({
        users: [],
        access: [],
        computers: [],
    });

    private readonly storage = inject(StorageService);
    private readonly router = inject(Router);
    private readonly requestService = inject(RequestService);
    private readonly snackBar = inject(MatSnackBar);

    ngOnInit(): void {
        this.loadRequests();
    }

    private loadRequests(): void {
        const user = this.storage.getItem<SessionUser>('user');
        if (user) {
            this.loading.set(true);
            this.requestService.getRequests(user.id).subscribe({
                next: data => {
                    this.requests.set(data);
                    this.loading.set(false);
                },
                error: error => {
                    console.error('Error al cargar solicitudes:', error);
                    this.loading.set(false);
                    this.snackBar.open('Error al cargar las solicitudes', 'Cerrar', {
                        duration: 5000,
                    });
                }
            });
        }
    }

    private formatData(): FormartedData[] {
        const users = this.requests().users.map(
            (user): FormartedData => ({
                id: user.id,
                user: user.name,
                userId: user.id,
                request: 'Creación de usuario',
                date: new Date(user.requestDate),
                status: this.formatStatus(user.status),
                type: 'user',
            })
        );

        const access = this.requests().access.map(
            (access): FormartedData => ({
                id: access.id,
                user: access.employeeName,
                userId: access.employeeId,
                request: `Acceso a ${access.systemName}`,
                date: new Date(access.requestDate),
                status: this.formatStatus(access.status),
                type: 'access',
            })
        );

        const computers = this.requests().computers.map(
            (computer): FormartedData => ({
                id: computer.id,
                user: computer.employeeName,
                userId: computer.employeeId,
                request: 'Asignación de computador',
                date: new Date(computer.requestDate),
                status: this.formatStatus(computer.status),
                type: 'computer',
            })
        );

        return [...users, ...access, ...computers].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    private formatStatus(status: string): ReqStatus {
        switch (status) {
            case 'PENDING':
                return 'Pendiente';
            case 'APPROVED':
                return 'Aprobada';
            case 'REJECTED':
                return 'Rechazada';
            case 'CANCELED':
                return 'Cancelada';
            default:
                return 'Desconocido';
        }
    }

    public refreshRequests(): void {
        this.loadRequests();
        this.snackBar.open('Solicitudes actualizadas', 'Cerrar', {
            duration: 2000,
        });
    }

    public getStatusClass(status: string): string {
        switch (status.toLowerCase()) {
            case 'pendiente':
                return 'status-pending';
            case 'aprobada':
                return 'status-approved';
            case 'rechazada':
            case 'cancelada':
                return 'status-rejected';
            default:
                return 'status-unknown';
        }
    }

    public goBackToDashboard(): void {
        this.router.navigate(['/dashboard']);
    }
}
