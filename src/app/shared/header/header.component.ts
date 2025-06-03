import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StorageService } from '../../core/services/storage/storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private readonly storage = inject(StorageService);

  constructor(private readonly router: Router) {}

  logout() {
    this.storage.clear();    
    this.router.navigate(['/login']);
  } 
  
  viewRequests() {
    this.router.navigate(['/requests']);
    
  }
}
