import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

const AUTH_URL_PREFIX = '/api/auth/';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const auth = inject(AuthService);
  const token = auth.token();

  const authorized =
    token && request.url.startsWith('/api/')
      ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : request;

  return next(authorized).pipe(
    catchError((error: unknown) => {
      // A 401 on login/register is a wrong password, not an expired session.
      const isSessionExpired =
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        !request.url.startsWith(AUTH_URL_PREFIX + 'login');
      if (isSessionExpired) auth.logout();
      return throwError(() => error);
    }),
  );
};
