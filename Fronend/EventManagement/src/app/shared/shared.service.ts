import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private userSubject = new BehaviorSubject<string>('User');
  username$ = this.userSubject.asObservable();

  private authData = new BehaviorSubject<string>('User');
  authData$ = this.authData.asObservable();

  private userId = new BehaviorSubject<number>(1);
  userId$ = this.userId.asObservable();

  private userLocation = new BehaviorSubject<string>("");
  userLocation$ = this.userLocation.asObservable();

  constructor(private cookieService: CookieService) {
    this.monitorUserChanges();
    this.monitorRoleChanges();
    this.monitorUserId();
    this.monitorUserLocation();
  }

  
  private monitorUserLocation(): void {
    interval(2000).subscribe(() => {
      const userLocation = this.getUserLocationFromCookies() as unknown as string;
      if (userLocation !== '' && userLocation !== this.userLocation.getValue()) {
        this.userLocation.next(userLocation);
      }
    });
  }

  private getUserLocationFromCookies(): number | null {
    try {
      const userData = this.getUserData();
      // console.log("this is from shared service:",userData?.id || null);

      return userData?.location || null;
    } catch (error) {
      console.error('Error retrieving user ID:', error);
      return null;
    }
  }


  private monitorUserId(): void {
    interval(2000).subscribe(() => {
      const userId = this.getUserIdFromCookies();
      if (userId !== null && userId !== this.userId.getValue()) {
        this.userId.next(userId);
      }
    });
  }

  private getUserIdFromCookies(): number | null {
    try {
      const userData = this.getUserData();
      // console.log("this is from shared service:",userData?.id || null);

      return userData?.id || null;
    } catch (error) {
      console.error('Error retrieving user ID:', error);
      return null;
    }
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
