import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../../models/role.model';
import { CreateUser } from '../../models/create-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);
  
  public createUser(user: CreateUser): Observable<void> {
    return this.http.post<void>('http://localhost:8080/api/employees', user);    
  }
  
  public getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>('http://localhost:8080/api/roles');
  }
}
