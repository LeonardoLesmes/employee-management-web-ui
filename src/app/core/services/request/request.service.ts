import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, map, Observable, of } from 'rxjs';
import { UserRes } from '../../models/user-res';
import { RequestRes } from '../../models/request-res';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {    
    private readonly userService = inject(UserService);

  public getRequests(assignedById: number): Observable<RequestRes> {    
    return combineLatest([this.userService.getUsersByAssignedId(assignedById)])
        .pipe(
            map(([users]) => { return { users };})
        );
  }
}
