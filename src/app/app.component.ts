import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { StorageService } from './core/services/storage/storage.service';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly storage = inject(StorageService);
  private readonly router = inject(Router);
  
  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
      )
      .subscribe((event) => {
        const url = event.urlAfterRedirects;
        if (url === '/login') {
          this.storage.clear();
        }
      });
  }

}
