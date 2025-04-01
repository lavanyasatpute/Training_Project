import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private userSubject = new BehaviorSubject<string>('User');
  username$ = this.userSubject.asObservable(); // Observable for username updates

  private authData = new BehaviorSubject<string>('User');
  authData$ = this.authData.asObservable(); // Observable for role updates

  constructor(private cookieService: CookieService) {
    this.monitorUserChanges();
    this.monitorRoleChanges();
  }

  private monitorUserChanges(): void {
    interval(2000).subscribe(() => {
      const newUsername = this.getUsernameFromCookies();
      if (newUsername && newUsername !== this.userSubject.getValue()) {
        this.userSubject.next(newUsername);
      }
    });
  }

  private getUsernameFromCookies(): string {
    try {
      const userData = this.getUserData();
      return userData?.name || 'User';
    } catch (error) {
      console.error('Error retrieving username:', error);
      return 'User';
    }
  }

  private monitorRoleChanges(): void {
    interval(2000).subscribe(() => {
      const newRole = this.getUserRole();
      if (newRole && newRole !== this.authData.getValue()) {
        this.authData.next(newRole);
      }
    });
  }

  private getUserRole(): string {
    try {
      const userData = this.getUserData();
      return userData?.role || 'User';
    } catch (error) {
      console.error('Error retrieving user role:', error);
      return 'User';
    }
  }

  private getUserData(): any {
    if (this.cookieService.check('userData')) {
      try {
        return JSON.parse(this.cookieService.get('userData'));
      } catch (error) {
        console.error('Error parsing cookie data:', error);
      }
    }
    return null;
  }

  deleteCookies(): void {
    this.cookieService.delete('userData', '/');
  }
}
