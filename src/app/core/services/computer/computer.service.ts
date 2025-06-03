import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  private readonly http = inject(HttpClient);

  public getComputersByAssignedId(assignedId: number) {
    return this.http.get<any[]>(`http://localhost:8080/api/computer-assignments/assigned-by/${assignedId}`);
  }
}
