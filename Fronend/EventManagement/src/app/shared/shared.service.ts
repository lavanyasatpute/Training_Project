import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private userSubject = new BehaviorSubject<string>('User');
  username$ = this.userSubject.asObservable(); // Observable to share user data


  constructor(private cookieService: CookieService) {
    this.checkForUserUpdates(); // Start checking for updates
  }

  private checkForUserUpdates(): void {
    // Poll every 2 seconds to detect username changes
    interval(2000).subscribe(() => {
      const newUsername = this.getUsernameFromCookies();
      if (newUsername !== this.userSubject.getValue()) {
        this.userSubject.next(newUsername); // Update BehaviorSubject if changed
      }
    });
  }

  private getUsernameFromCookies(): string {
    if (this.cookieService.check('userData')) {
      try {
        const userData = JSON.parse(this.cookieService.get('userData'));
        // console.log("From shared service: ",userData);

        return userData.name || 'User' || ''; // Return username or default
      } catch (error) {
        console.error('Error parsing cookie data:', error);
      }
    }
    return 'User';
  }

  deleteCookies() {
    this.cookieService.delete('userData', '/');
  }


  // private authData = new BehaviorSubject<boolean>(this.hasValidToken());

  // authData$ = this.authData.asObservable();

 

  // hasValidToken(): any {
  //   if(!this.cookieService.get('userData')) return {role:'user'}
  //   return JSON.parse(this.cookieService.get('userData')); // Check if token exists in cookies/localStorage
  // }

  // updateAuthState() {
  //   this.authData.next(this.hasValidToken());
  // }
}
