import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRes } from '../../models/login-res';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly http = inject(HttpClient);
  
  public login(email: string, password: string): Observable<LoginRes> {
    return this.http.post<LoginRes>('http://localhost:8080/api/auth/login', { email, password });
  }
}
