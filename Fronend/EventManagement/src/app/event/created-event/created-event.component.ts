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

  // Add these properties for edit functionality
  editEventForm: any = {};
  categoryList: string[] = ['Technology', 'Film', 'Media', 'Entertainment', 'Sports', 'Education', 'Business',"Festival"];

  constructor(
    private sharedService: SharedService,
    private dialog: MatDialog,
    private eventService: EventService,
    private userEventService: UserEventService
  ) { }

  ngOnInit() {
    this.eventService.eventCreateByUser$.subscribe(data => {
      this.createdEventList = data;
      // console.log("this is from Created eventlist component..", data);
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
        title: `Delete ${Title}`,
        eventId: eventId,
        "Event": `You are Crested that Event: ${Title}`,
        button: "Delete",
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.cancelEvent(index, String(eventId));
    });
  }

  cancelEvent(index: number, eventId: string) {
    this.createdEventList = this.createdEventList.filter((item, i) => i !== index);

    this.eventService.deleteEventCreatedByUser(eventId, index).subscribe(data => {
      console.log("Event cancel", data);
    });
  }

  // New methods for edit functionality
  editEvent(event: any, index: number): void {
    // Make a copy of the event to avoid direct binding before submitting
    this.editEventForm = { ...event };

    // Convert string date to Date object if needed
    if (typeof this.editEventForm.Schedule === 'string') {
      this.editEventForm.Schedule = new Date(this.editEventForm.Schedule);
    }

    // Set the editing flag
    event.isEditing = true;
  }

  cancelEdit(event: any): void {
    // Reset the editing flag
    event.isEditing = false;
    // Clear form
    this.editEventForm = {};
  }

  updateEvent(eventId: string, index: number): void {
    this.eventService.updateEventCreatedByUser(eventId, this.editEventForm).subscribe(
      (updatedEvent) => {
        // Update the event in the list is handled by the service
        // Just turn off editing mode
        console.log(updatedEvent);
        
        this.createdEventList[index].isEditing = false;
        // Clear form
        this.editEventForm = {};
      },
      (error) => {
        console.error('Error updating event:', error);
      }
    );
  }
}