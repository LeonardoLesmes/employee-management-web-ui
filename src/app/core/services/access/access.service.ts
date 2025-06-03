import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AccessRes } from '../../models/access-res';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  private readonly http = inject(HttpClient);

  public getAccessByAssignedId(assignedId: number): Observable<AccessRes[]> {
    return this.http.get<AccessRes[]>(`http://localhost:8080/api/access-requests/assigned-by/${assignedId}`);
  }
}
