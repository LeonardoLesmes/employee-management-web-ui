import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { TokenService } from '../../services/token/token.service';
import { catchError, map, of } from 'rxjs';
import { LoginRes } from '../../models/login-res';

export const tokenGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storage = inject(StorageService);
  const user = storage.getItem<LoginRes>('user');
  if (user?.token) {
    const tokenService$ = inject(TokenService);
    return tokenService$.verifyToken(user.token).pipe(
      catchError(() => of(false)),
      map(isValid => isValid ? true : router.createUrlTree(['/login']))
    );
  }    
  return router.createUrlTree(['/login']);
};
