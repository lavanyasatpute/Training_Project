import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../Services/Authentication/auth.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  allUserProfile:any[] = []

  UserRole:boolean = false

  userFields = [
    { label: 'Name', key: 'Name', id: 'name' },
    { label: 'Email', key: 'Email', id: 'email' },
    { label: 'Username', key: 'Username', id: 'username' },
    { label: 'Contact Details', key: 'ContactDetails', id: 'contactDetails' },
    { label: 'Role', key: 'role', id: 'role' }
  ];

  constructor(private sharedService: SharedService, private authService: AuthService) {
    this.authService.getAllUser().subscribe(data => {
      this.allUserProfile = data;
    });

    this.sharedService.authData$.subscribe(role => {
      this.UserRole = role.toLowerCase() === 'admin';
    });
  }

  public getColumns(): string[] {
    return this.allUserProfile.length ? Object.keys(this.allUserProfile[0]) : [];
  }
  

}
