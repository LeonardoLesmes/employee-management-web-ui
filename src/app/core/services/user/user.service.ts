import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../../models/user/role.model';
import { UserReq } from '../../models/user/user-req';
import { UserRes } from '../../models/user/user-res';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly http = inject(HttpClient);

    public createUser(user: UserReq): Observable<void> {
        return this.http.post<void>(environment.resources.employees.base, user);
    }

    public getUsersByAssignedId(assignedId: number): Observable<UserRes[]> {
        return this.http.get<UserRes[]>(`${environment.resources.employees.assignedBy}/${assignedId}`);
    }

    public getRoles(): Observable<Role[]> {
        return this.http.get<Role[]>(environment.resources.employees.roles);
    }

    public getUserById(userId: number): Observable<UserRes> {
        return this.http.get<UserRes>(`${environment.resources.employees.base}/${userId}`);
    }
}
