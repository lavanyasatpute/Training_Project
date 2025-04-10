import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn:'root'
})

export class AuthGuard implements CanActivate{
  constructor(private cookiesService:CookieService,private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const value = this.cookiesService.check('userData');
    if(value){
      return true
    }

    this.router.navigate(['/user/login']);
    return false
    
  }

}
