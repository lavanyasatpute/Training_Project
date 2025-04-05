import { Component } from '@angular/core';
import { EventService } from '../../Services/event/event.service';
import { fadeInAnimation } from '../../angular-animation/animations';
import { SharedService } from '../../shared/shared.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from '../../shared/generic-dialog/generic-dialog.component'
import { UserEventService } from '../../Services/UserEvent/user-event.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-event-list',
  standalone: false,
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css',
  animations: [fadeInAnimation]
})
export class EventListComponent {
  eventList: any[] = []
  user = false
  constructor(private eventService: EventService,
    private sharedService: SharedService,
    private dialog: MatDialog,
    private userEventService: UserEventService,
    private cookieService: CookieService
  ) {

    this.eventService.EList$.subscribe(data => {
      this.eventList = data;
      // console.log("this is from eventlist component..", data);
    });
  }

  ngOnInit() {
    this.sharedService.username$.subscribe(item => {
      if (item != 'User') {
        this.user = true
      } else {
        this.user = false
      }
    })
  }

  openDialog(Title: string, eventId: number) {
    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {
        title: `Register for ${Title}`,
        eventId: eventId,
        "Event": `You are about to register for Event: ${Title}`,
        button: "Join"
      }
    });
    const cookiesData = JSON.parse(this.cookieService.get('userData'))
    console.log("this is from event list", cookiesData.id);

    this.joinEvent(eventId, cookiesData.id)
  }

  joinEvent(eventId: number, userId: number) {
    this.userEventService.joinEventByUser(eventId, userId).subscribe((data: any) => {
      console.log(data);

    })
  }





}
