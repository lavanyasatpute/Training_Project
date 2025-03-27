import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';


@Injectable()
export class ApiRouteInterceptor{
    constructor(private cookieService:CookieService){}
    intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{
        const token = this.cookieService.get('usertoken');
        let modifiedReq = req;
        if(token){
          modifiedReq = req.clone({
            setHeaders:{
              Authorization: `Bearer ${token}`
            }
          });
        }
        type NewType = HttpErrorResponse;

        return next.handle(modifiedReq).pipe(
          catchError((error:NewType)=>{
            if(error.status === 401){
              console.error('Unauthorized request - redirect to Login');
            }
            return throwError(() => error);
          })
        );
      }
  
}
