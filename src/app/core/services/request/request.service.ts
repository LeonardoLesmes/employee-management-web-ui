import { inject, Injectable } from '@angular/core';
import { combineLatest, map, Observable, of } from 'rxjs';
import { UserRes } from '../../models/user-res';
import { RequestRes } from '../../models/request-res';
import { UserService } from '../user/user.service';
import { AccessService } from '../access/access.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {    
    private readonly userService = inject(UserService);
    private readonly accessService = inject(AccessService);

  public getRequests(assignedById: number): Observable<RequestRes> {    
    return combineLatest([
        this.userService.getUsersByAssignedId(assignedById),
        this.accessService.getAccessByAssignedId(assignedById),
    ]).pipe(
        map(([users, access]) => { 
          return { users, access };
        })
    );
  }
  
  public cancelRequest(requestId: number): Observable<boolean> {
    // En producción, llamaríamos a un endpoint:
    // return this.http.put<boolean>(`http://localhost:8080/api/requests/${requestId}/cancel`, {});
    
    // Para desarrollo, simplemente retornamos éxito
    return of(true);
  }
  
  public getRequestDetails(requestId: number): Observable<UserRes | undefined> {
    // En producción, llamaríamos a un endpoint:
    // return this.http.get<UserRes>(`http://localhost:8080/api/requests/${requestId}`);
    
    // Para desarrollo, usamos un mock
    return of(undefined);
  }
}
