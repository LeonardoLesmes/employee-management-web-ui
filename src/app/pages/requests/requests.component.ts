import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeaderComponent } from '../../shared/header/header.component';
import { RequestService } from '../../core/services/request/request.service';
import { RequestRes } from '../../core/models/request-res';
import { FormartedData } from './models/formated-data';
import { StorageService } from '../../core/services/storage/storage.service';
import { User } from '../../core/models/user.model';
import { ReqStatus } from './models/req-status';

@Component({
  selector: 'app-requests',
  standalone: true,  imports: [
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
    HeaderComponent
  ],
  providers: [RequestService],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})
export class RequestsComponent implements OnInit {
  public dataSource = computed(() => this.formatData());

  private readonly requests = signal<RequestRes>({ users: [], access: [] });

  private readonly storage = inject(StorageService);
  constructor(
    private readonly router: Router,
    private readonly requestService: RequestService,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  private loadRequests(): void {
    const user = this.storage.getItem<User>('user');
    if (user) {
      this.requestService.getRequests(user.id).subscribe(data => {
        this.requests.set(data);
      });
    }
  }

  private formatData(): FormartedData[] {
    const users = this.requests().users.map((user): FormartedData => ({
      id: user.id,
      user: user.name,
      userId: user.id,
      request: 'Creación de usuario',
      date: user.createdAt,
      status: this.formatStatus(user.status),
      type: 'user'
    }));
    
    const access = this.requests().access.map((access): FormartedData => ({
      id: access.id,
      user: access.employeeName,
      userId: access.employeeId,
      request: `Acceso a ${access.systemName}`,
      date: new Date(access.requestDate),
      status: this.formatStatus(access.status),
      type: 'access'
    }));
    
    return [ ...users, ...access ];
  }

  private formatStatus(status: string): ReqStatus{
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

  refreshRequests(): void {
    this.loadRequests();
    this.snackBar.open('Solicitudes actualizadas', 'Cerrar', {
      duration: 2000
    });
  }


  getStatusClass(status: string): string {
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

  goBackToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
