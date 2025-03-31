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
  UserRole:boolean = true
  constructor(private sharedService: SharedService,private authService:AuthService) {
    this.authService.getAllUser().subscribe(data=>this.allUserProfile = data);
    // this.sharedService.username$.subscribe((item:any)=>{
    //   if(item.role == 'admin'){
    //     this.UserRole = true
    //   }else{
    //     this.UserRole = false
    //   }
    // })
  }

  public getColumns(): string[] {
    return this.allUserProfile.length ? Object.keys(this.allUserProfile[0]) : [];
  }

  

}
