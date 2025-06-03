import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../../models/role.model';
import { UserReq } from '../../models/user-req';
import { UserRes } from '../../models/user-res';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);
  
  public createUser(user: UserReq): Observable<void> {
    return this.http.post<void>('http://localhost:8080/api/employees', user);    
  }

  public getUsersByAssignedId(assignedId: number): Observable<UserRes[]> {
    return this.http.get<UserRes[]>(`http://localhost:8080/api/employees/assigned-by/${assignedId}`);
  }
  
  public getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>('http://localhost:8080/api/roles');
  }
  
  public getUserById(userId: number): Observable<UserRes> {
    return this.http.get<UserRes>(`http://localhost:8080/api/employees/${userId}`);
  }
}
