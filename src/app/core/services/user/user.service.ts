import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user.model';
import { Role } from '../../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);

  
  createUser(user: User): Observable<User> {
    
    console.log('Creating user:', user);
    return of(user);
  }

  
  public getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>('http://localhost:8080/api/roles');
  }
}
