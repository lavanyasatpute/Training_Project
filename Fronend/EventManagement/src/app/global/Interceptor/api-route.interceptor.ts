import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiRouteInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let modifiedReq = req;
    let token = '';

    try {
      // Check if 'userData' cookie exists and is not empty
      if (this.cookieService.check('userData')) {
        const cookieData = this.cookieService.get('userData').trim();
        if (cookieData) {
          const userData = JSON.parse(cookieData);
          token = userData?.Token || ''; // Extract token safely
        }
      }
    } catch (error) {
      console.error('Error parsing userData from cookies:', error);
    }

    console.log("From route interceptor: ", token);

    if (token) {
      modifiedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('Unauthorized request - redirecting to Login');
          // Optionally, you can clear cookies and redirect to login
          this.cookieService.delete('userData', '/');
          // window.location.href = '/login'; // Uncomment if you want to redirect
        }
        return throwError(() => error);
      })
    );
  }
}
