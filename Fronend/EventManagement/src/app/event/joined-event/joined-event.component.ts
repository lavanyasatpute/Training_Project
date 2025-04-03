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
  ) {

    this.userEventService.eventUserList$.subscribe(data => {
      this.eventUserList = data;
      console.log("this is from join eventlist component..", data);
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
        button: "Cancel"
      }
    });
    // const cookiesData = JSON.parse(this.cookieService.get('userData'))
    // console.log(cookiesData);

    // this.joinEvent(eventId,cookiesData.id)
  }

}




