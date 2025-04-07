import { Component } from '@angular/core';
import { EventService } from '../../Services/event/event.service';
import { fadeInAnimation } from '../../angular-animation/animations';
import { SharedService } from '../../shared/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from '../../shared/generic-dialog/generic-dialog.component'
import { UserEventService } from '../../Services/UserEvent/user-event.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-joined-event',
  standalone: false,
  templateUrl: './joined-event.component.html',
  styleUrl: './joined-event.component.css',
  animations: [fadeInAnimation]
})

export class JoinedEventComponent {
  eventUserList: any[] = []
  user = false
  constructor(
    private sharedService: SharedService,
    private dialog: MatDialog,
    private userEventService: UserEventService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {

    this.userEventService.eventList$.subscribe(data => {
      this.eventUserList = data;
      console.log("this is from join eventlist component..", data);
    });
    this.sharedService.username$.subscribe(item => {
      if (item != 'User') {
        this.user = true
      } else {
        this.user = false
      }
    })
  }

  openDialog(Title: string, eventId: string, index: number) {
    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {
        title: `Cancel ${Title}`,
        eventId: eventId,
        "Event": `You are about to register for Event: ${Title}`,
        button: "Cancel",
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.cancelEvent(index, eventId);
    });
  }

  cancelEvent(index: number, eventId: string) {
    this.eventUserList = this.eventUserList.filter((item, i) => i !== index);
    
    this.userEventService.leaveEvent(String(eventId), index).subscribe((data:any) => {
      console.log("Event cancel", data);
    });
    

  }

}




