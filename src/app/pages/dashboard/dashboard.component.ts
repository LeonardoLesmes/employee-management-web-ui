import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    HeaderComponent,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  
  constructor(private readonly router: Router) {}
  
  viewAllRequests() {
    this.router.navigate(['/requests']);
  }

  public registerNewUser() {
    this.router.navigate(['/create-user']);
  }
  
  requestAccess() {
    this.router.navigate(['/request-access']);
  }
    
  assignComputer() {
    this.router.navigate(['/assign-computer']);
  }
}
