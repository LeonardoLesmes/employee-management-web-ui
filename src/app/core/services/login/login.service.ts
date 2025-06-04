import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRes } from '../../models/login/login-res';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    private readonly http = inject(HttpClient);

    public login(email: string, password: string): Observable<LoginRes> {
        return this.http.post<LoginRes>(environment.resources.auth.login, { email, password });
    }
}
