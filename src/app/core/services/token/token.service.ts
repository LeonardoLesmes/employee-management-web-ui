import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    private readonly http = inject(HttpClient);

    public verifyToken(token: string): Observable<boolean> {
        return this.http.post<boolean>(environment.resources.auth.checkToken, { token });
    }
}
