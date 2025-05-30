import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private userSubject = new BehaviorSubject<string>('User');
  username$ = this.userSubject.asObservable();

  private authData = new BehaviorSubject<string>('User');
  authData$ = this.authData.asObservable();

  private userId = new BehaviorSubject<string>("");
  userId$ = this.userId.asObservable();

  private userLocation = new BehaviorSubject<string>("");
  userLocation$ = this.userLocation.asObservable();

  constructor(private cookieService: CookieService) {
    this.monitorUserChanges();
    this.monitorRoleChanges();
    this.monitorUserId();
    this.monitorUserLocation();
  }


  monitorUserLocation(): void {

    const userLocation = this.getUserLocationFromCookies() as unknown as string;
    if (userLocation !== '' && userLocation !== this.userLocation.getValue()) {
      this.userLocation.next(userLocation);
    }

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


  monitorUserId(): void {

    const userId = this.getUserIdFromCookies();
    if (userId !== null && String(userId) !== String(this.userId.getValue())) {
      this.userId.next(String(userId));
    }

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

  monitorUserChanges(): void {

    const newUsername = this.getUsernameFromCookies();
    if (newUsername && newUsername !== this.userSubject.getValue()) {
      this.userSubject.next(newUsername);
    }

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

  monitorRoleChanges(): void {

    const newRole = this.getUserRole();
    if (newRole && newRole !== this.authData.getValue()) {
      this.authData.next(newRole);

    }
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
