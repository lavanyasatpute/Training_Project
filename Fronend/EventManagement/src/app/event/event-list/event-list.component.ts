import { Component } from '@angular/core';
import { EventService } from '../../Services/event/event.service';
import { fadeInAnimation } from '../../angular-animation/animations';
import { SharedService } from '../../shared/shared.service';


@Component({
  selector: 'app-event-list',
  standalone: false,
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css',
  animations: [fadeInAnimation]
})
export class EventListComponent {
  eventList: any[] = []
  user=false
  constructor(private eventService: EventService,private sharedService:SharedService) {
    this.eventService.EList$.subscribe(data => {
      this.eventList = data;
      console.log("this is from eventlist component..", data);
    });
  }

  ngOnInit(){
    this.sharedService.username$.subscribe(item=>{
      if(item != 'User'){
        this.user = true
      }else{
        this.user = false
      }
    })
  }

}
