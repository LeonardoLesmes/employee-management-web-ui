import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { HeaderComponent } from '../../shared/header/header.component';

interface RequestItem {
  id: number;
  person: string;
  type: string;
  status: 'pendiente' | 'aprobada' | 'rechazada';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatBadgeModule,
    HeaderComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  requests: RequestItem[] = [
    { id: 1, person: 'Carlos Martinez', type: 'Creación de Usuario', status: 'pendiente' },
    { id: 2, person: 'Ana González', type: 'Acceso a GifLab', status: 'aprobada' },
    { id: 3, person: 'Luis Pérez', type: 'Asignación de Computador', status: 'rechazada' }
  ];
  
  showRequests: boolean = false;
  
  toggleRequestsView() {
    this.showRequests = !this.showRequests;
  }
  
  getStatusClass(status: string): string {
    switch (status) {
      case 'pendiente': return 'status-pending';
      case 'aprobada': return 'status-approved';
      case 'rechazada': return 'status-rejected';
      default: return '';
    }
  }
    viewDetails(id: number) {
    console.log(`Ver detalles de la solicitud ${id}`);
  }
  
  registerNewUser() {
    console.log('Registrar nuevo usuario');
  }
  
  requestAccess() {
    console.log('Solicitar acceso');
  }
  
  assignComputer() {
    console.log('Asignar computador');
  }
}
