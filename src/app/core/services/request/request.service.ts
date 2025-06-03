import { inject, Injectable } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { RequestRes } from '../../models/request-res';
import { UserService } from '../user/user.service';
import { AccessService } from '../access/access.service';
import { ComputerService } from '../computer/computer.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {    
    private readonly userService = inject(UserService);
    private readonly accessService = inject(AccessService);
    private readonly computerService = inject(ComputerService);

  public getRequests(assignedById: number): Observable<RequestRes> {    
    return combineLatest([
        this.userService.getUsersByAssignedId(assignedById),
        this.accessService.getAccessByAssignedId(assignedById),
        this.computerService.getComputersByAssignedId(assignedById),
    ]).pipe(
        map(([users, access, computers]) => { 
          return { users, access, computers };
        })
    );
  }
}
