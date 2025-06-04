import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AccessRes } from '../../models/access/access-res';
import { Observable, of } from 'rxjs';
import { System } from '../../models/access/system.model';
import { AccessReq } from '../../models/access/access-req';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
    providedIn: 'root',
})
export class AccessService {
    private readonly http = inject(HttpClient);

    public getAccessByAssignedId(assignedId: number): Observable<AccessRes[]> {
        return this.http.get<AccessRes[]>(`${environment.resources.access.assignedBy}/${assignedId}`);
    }

    public getSystems(): Observable<System[]> {
        return this.http.get<System[]>(environment.resources.access.systems);
    }

    public createAccessRequest(access: AccessReq): Observable<void> {
        return this.http.post<void>(environment.resources.access.base, access);
    }
}
