import { Component } from '@angular/core';
import { fadeInAnimation } from '../../angular-animation/animations';
import { SharedService } from '../../shared/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from '../../shared/generic-dialog/generic-dialog.component'
import { UserEventService } from '../../Services/UserEvent/user-event.service';
import { CookieService } from 'ngx-cookie-service';
import { EventService } from '../../Services/event/event.service';

@Component({
  selector: 'app-created-event',
  standalone: false,
  templateUrl: './created-event.component.html',
  styleUrl: './created-event.component.css',
  animations: [fadeInAnimation]
})
export class CreatedEventComponent {
  createdEventList: any[] = []
  user = false
  constructor(
    private sharedService: SharedService,
    private dialog: MatDialog,
    private eventService: EventService,
    private userEventService: UserEventService
  ) { }

  ngOnInit() {

    this.eventService.eventCreateByUser$.subscribe(data => {
      this.createdEventList = data;
      console.log("this is from Created eventlist component..", data);
    });
    this.sharedService.username$.subscribe(item => {
      if (item != 'User') {
        this.user = true
      } else {
        this.user = false
      }
    })
  }

  openDialog(Title: string, eventId: number, index: number) {
    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {
        title: `Delete ${Title}`,
        eventId: eventId,
        "Event": `You are Crested that Event: ${Title}`,
        button: "Delete",
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.cancelEvent(index, eventId);
    });
  }

  cancelEvent(index: number, eventId: number) {
    this.createdEventList = this.createdEventList.filter((item, i) => i !== index);

    // this.eventService.deleteEventCreatedByUser(eventId, index).subscribe(data => {
    //   console.log("Event cancel", data);
    // });


  }
}
