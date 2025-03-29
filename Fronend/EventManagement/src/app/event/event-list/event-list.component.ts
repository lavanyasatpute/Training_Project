import { Component } from '@angular/core';
import { EventService } from '../../Services/event/event.service';

@Component({
  selector: 'app-event-list',
  standalone:false,
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent {
  eventList :any[] = []
  constructor(private eventService:EventService){
    this.eventService.EList$.subscribe(data=> this.eventList = data);
    console.log("this is from eventlist component..", this.eventList[0]['source']);
    
  }

}
