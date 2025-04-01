import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit {
  isSidebarOpen: boolean = false;
  activeSubmenu: string | null = null;
  public isLogedIn: boolean = false;
  public username: string = '';

  constructor(private cookieService: CookieService,private sharedService:SharedService) {}

  ngOnInit(): void {
    this.sharedService.username$.subscribe((data:any)=>this.username = data);
    this.sharedService.username$.subscribe((item:any)=>{
      // console.log(item);
      
      if(item != 'User'){
        this.isLogedIn = true
      }else{
        this.isLogedIn = false
      }
    })
    console.log(this.isLogedIn);
     // Check if cookie exists
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleSubmenu(menu: string): void {
    this.activeSubmenu = this.activeSubmenu === menu ? null : menu;
  }
  signOut(){
    this.sharedService.deleteCookies();
  }
}
