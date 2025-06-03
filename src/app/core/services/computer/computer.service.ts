import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComputerRes } from '../../models/computer-res.model';
import { ComputerReq } from '../../models/computer-assignment-req.model';
import { UserComputerRes } from '../../models/user-computer.model';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  private readonly http = inject(HttpClient);

  public getComputersByAssignedId(assignedId: number): Observable<ComputerRes[]> {
    return this.http.get<ComputerRes[]>(`http://localhost:8080/api/computer-assignments/assigned-by/${assignedId}`);
  }

  public getAvailableComputers(): Observable<ComputerRes[]> {
    return this.http.get<ComputerRes[]>('http://localhost:8080/api/computer-assignments/available');
  }
  
  public assignComputer(request: ComputerReq): Observable<void> {
    return this.http.post<void>('http://localhost:8080/api/computer-assignments', request);
  }

  public getComputerByUserId(employeeId: number): Observable<UserComputerRes | null> {
    return this.http.get<UserComputerRes | null>(`http://localhost:8080/api/computer-assignments/employee/${employeeId}`);        
  }
}
