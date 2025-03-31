import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../Services/Authentication/auth.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  allUserProfile:any[] = []
  constructor(private cookieService: CookieService,private authService:AuthService) {
    this.authService.getAllUser().subscribe(data=>this.allUserProfile = data);
  }

  

}
