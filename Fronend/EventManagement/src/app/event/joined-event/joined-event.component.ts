import { Component } from '@angular/core';
import { EventService } from '../../Services/event/event.service';
import { fadeInAnimation } from '../../angular-animation/animations';
import { SharedService } from '../../shared/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from '../../shared/generic-dialog/generic-dialog.component'
import { UserEventService } from '../../Services/UserEvent/user-event.service';
import { CookieService } from 'ngx-cookie-service';
import { FeedbackService } from '../../Services/feedBack/feedback.service';
import { StarIcon } from 'primeng/icons';
import { AuthService } from '../../Services/Authentication/auth.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-joined-event',
  standalone: false,
  templateUrl: './joined-event.component.html',
  styleUrl: './joined-event.component.css',
  animations: [fadeInAnimation]
})

export class JoinedEventComponent {
  eventUserList: any[] = []
  eventAdminList: any[] = [];
  user = false;
  showFeedbackPopup = false;
  feedbackData = {
    rating: 1,
    comment: '',
    eventId: ''
  };
  userRole: string = 'user'
  constructor(
    private sharedService: SharedService,
    private dialog: MatDialog,
    private userEventService: UserEventService,
    private eventService: EventService,
    private feeBackService: FeedbackService,
    private authService: AuthService,

  ) {
    this.sharedService.authData$.subscribe(role => {
      this.userRole = role
    })
  }

  ngOnInit() {

    this.userEventService.eventList$.subscribe(data => {
      this.eventUserList = data;
    });

    this.eventService.getAllEventForAdmin().subscribe((event: any) => {
      const userNameObservables = event.data.map((item: any) =>
        this.authService.filteredUser(item.CreatedById)
      );

      forkJoin(userNameObservables).subscribe((userData: any) => {
        // Merge user data with event data
        this.eventAdminList = event.data.map((eventItem: any, index: number) => ({
          ...eventItem,
          CreatedById: userData[index][0].Name
        }));

        console.log("Final merged data:", this.eventAdminList);
      });
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
        button: "Booking Cancel",
        cbutton:"Not Cancel"
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result === 'confirm') {this.cancelEvent(index, eventId);}
      else{
        console.log("Cancel without confirmation.");
        
      }
    });
  }

  cancelEvent(index: number, eventId: string) {
    this.eventUserList = this.eventUserList.filter((item, i) => i !== index);

    this.userEventService.leaveEvent(String(eventId), index).subscribe((data: any) => {
      console.log("Event cancel", data);
    });
  }

  openFeedbackPopup(eventId: string) {
    this.feedbackData = {
      rating: 1,
      comment: '',
      eventId: eventId
    };
    this.showFeedbackPopup = true;
  }

  closeFeedbackPopup() {
    this.showFeedbackPopup = false;
  }

  // feedBack(eventId: string, comments: string, rating: number) {
  //   this.feeBackService.feedBack(eventId, comments, rating).subscribe((data) => {
  //     console.log(data);

  //   })

  // }
  submitFeedback() {
    // Call your API to submit the feedback
    const { eventId, rating, comment } = this.feedbackData;
    console.log('Submitting feedback:', { eventId, rating, comment });
    this.feeBackService.feedBack(eventId, comment, rating).subscribe((data) => {
      console.log(data);
    });

    // Example: Call a feedbackService
    // this.feedbackService.submitFeedback(this.feedbackData).subscribe(...);

    this.closeFeedbackPopup();
  }
  approveEvent(id: string,event:any) {
    this.eventService.aprroveEvent(id,event).subscribe({
      next: (data: any) => {
        alert(data.data);
      },
      error: (err: any) => {
        alert(`Error approving event:, ${err}`);
      }
    });
  }
  rejectEvent(id: string) {
    this.eventService.rejectEvent(id).subscribe({
      next: (data: any) => {
        alert(data.data);
      },
      error: (err: any) => {
        alert(`Error approving event:, ${err}`);
      }
    });
  }
}




