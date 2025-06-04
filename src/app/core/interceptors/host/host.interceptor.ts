import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';

export const hostInterceptor: HttpInterceptorFn = (req, next) => {
    const host = environment.resources.host;
    const url = `${host}${req.url}`;
    return next(req.clone({ url }));
};
