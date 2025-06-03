import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly http = inject(HttpClient);

  public verifyToken(token: string): Observable<boolean> {
    return this.http.post<boolean>('http://localhost:8080/api/auth/validate-token', { token });
  }
}
