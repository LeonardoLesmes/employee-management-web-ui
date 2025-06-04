import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserComputerRes } from '../../models/computer/user-computer-res.model';
import { UserComputerReq } from '../../models/computer/user-computer-req.model';
import { ComputerDetails } from '../../models/computer/computer-details';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
    providedIn: 'root',
})
export class ComputerService {
    private readonly http = inject(HttpClient);

    public getComputersByAssignedId(assignedId: number): Observable<UserComputerRes[]> {
        return this.http.get<UserComputerRes[]>(`${environment.resources.computer.assignedBy}/${assignedId}`);
    }

    public getAvailableComputers(): Observable<ComputerDetails[]> {
        return this.http.get<ComputerDetails[]>(environment.resources.computer.available);
    }

    public assignComputer(request: UserComputerReq): Observable<void> {
        return this.http.post<void>(environment.resources.computer.base, request);
    }

    public getComputerByUserId(employeeId: number): Observable<UserComputerRes | null> {
        return this.http.get<UserComputerRes | null>(`${environment.resources.computer.employee}/${employeeId}`);
    }
}
