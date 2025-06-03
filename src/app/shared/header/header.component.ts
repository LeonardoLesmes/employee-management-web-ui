import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
  constructor(private readonly router: Router) {}

  logout() {
    // Aquí iría la lógica de logout
    this.router.navigate(['/login']);
  }  viewRequests() {
    const requestsSection = document.querySelector('.requests-container');
    if (requestsSection) {
      requestsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
