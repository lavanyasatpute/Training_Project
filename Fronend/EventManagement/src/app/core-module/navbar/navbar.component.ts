import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from '../../shared/shared.service';
import { EventService } from '../../Services/event/event.service';
import { HttpClient } from '@angular/common/http';

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

  public location:string = ""

  public createdEvent = true;

  constructor(private eventService: EventService,private sharedService:SharedService,private http:HttpClient) {}

  ngOnInit(): void {



    
    this.sharedService.username$.subscribe((data:any)=>this.username = data);
    this.sharedService. userLocation$.subscribe(data=>this.location = data);
    this.sharedService.username$.subscribe((item:any)=>{
      // console.log(item);
      
      if(item != 'User'){
        this.isLogedIn = true
      }else{
        this.isLogedIn = false
      }
    })
    console.log(this.isLogedIn);

    // this.eventService.Locationlist$.subscribe(item=>this.locations = item)
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
