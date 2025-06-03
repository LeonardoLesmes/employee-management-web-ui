import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HeaderComponent } from '../../shared/header/header.component';
import { RequestDetailModalComponent } from '../../shared/request-detail-modal/request-detail-modal.component';
import { RequestService } from '../../core/services/request/request.service';
import { UserRes } from '../../core/models/user-res';
import { RequestRes } from '../../core/models/request-res';
import { FormartedData } from './models/formated-data';
import { StorageService } from '../../core/services/storage/storage.service';
import { User } from '../../core/models/user.model';
import { ReqStatus } from './models/req-status';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatTooltipModule,
    MatSnackBarModule,
    HeaderComponent
  ],
  providers: [RequestService],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})
export class RequestsComponent implements OnInit {
  public dataSource = computed(() => this.formatData());

  private readonly requests = signal<RequestRes>({ users: [] });

  private readonly storage = inject(StorageService);

  constructor(
    private readonly requestService: RequestService,
    private readonly dialog: MatDialog,
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
      user: user.name,
      request: 'Creación de usuario',
      date: user.createdAt,
      status: this.formatStatus(user.status),
    }));
    return [ ...users ]
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

  viewDetails(request: UserRes): void {
    this.dialog.open(RequestDetailModalComponent, {
      width: '450px',
      data: request
    });
  }  
  
  cancelRequest(requestId: number): void {

  }
}
