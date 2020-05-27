import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

// Hint: add additional reasons here if needed
export type LogoutReason = 'not_logged_in';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let extendedRequest = request;

    // If the user is logged in clone the request and append the login token to the headers
    if (this.authService.isLoggedIn()) {
      extendedRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.authService.getToken()}`),
      });
    }

    // send the modified request.
    return next.handle(extendedRequest)
      .pipe(
        // adding a error handler to listen for "401" errors.
        catchError(error => {
          if (this.isInvalidToken(error)) {
            // If a 401 error happens the token is invalid and the user must be logged out.
            return this.authService.logout().pipe(
              switchMap(() => {
                // Hint: think of other reasons, like 'account_blocked' etc.
                const logoutReason: LogoutReason = 'not_logged_in';

                // Redirect the user to the login page and optionally pass a reason to it so you can display a message to the user there.
                return this.router.navigate(['/login'], { queryParams: { reason: logoutReason } });
              }),
              // return a empty observable to mark the request handling as done
              switchMap(() => EMPTY)
            );
          }

          return throwError(error);
        }),
      );
  }

  /**
   * Examine the error response if the reason for that error was an invalid token
   */
  isInvalidToken(error: HttpErrorResponse): boolean {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        return true;
      } else if (error.status === 400) {
        try {
          return error.error.message.reduce((invalidToken, messages) => {
            if (!invalidToken) {
              return messages.messages.reduce((isInvalid, message) => {
                if (!isInvalid) {
                  return message.id === 'No authorization header was found';
                }
                return isInvalid;
              }, invalidToken);
            }
          }, false);
        } catch {
          return false;
        }
      }
    }

    return false;
  }
}
