import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserComputerRes } from '../../models/user-computer-res.model';
import { UserComputerReq } from '../../models/user-computer-req.model';
import { ComputerDetails } from '../../models/computer-details';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  private readonly http = inject(HttpClient);

  public getComputersByAssignedId(assignedId: number): Observable<UserComputerRes[]> {
    return this.http.get<UserComputerRes[]>(`http://localhost:8080/api/computer-assignments/assigned-by/${assignedId}`);
  }

  public getAvailableComputers(): Observable<ComputerDetails[]> {
    return this.http.get<ComputerDetails[]>('http://localhost:8080/api/computer-assignments/available');
  }
  
  public assignComputer(request: UserComputerReq): Observable<void> {
    return this.http.post<void>('http://localhost:8080/api/computer-assignments', request);
  }

  public getComputerByUserId(employeeId: number): Observable<UserComputerRes | null> {
    return this.http.get<UserComputerRes | null>(`http://localhost:8080/api/computer-assignments/employee/${employeeId}`);        
  }
}
