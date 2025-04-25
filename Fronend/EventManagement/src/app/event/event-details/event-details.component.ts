import { Component } from '@angular/core';
import { ITicket } from '../../model/ticket.interface';
import { TicketService } from '../../Services/ticket/ticket.service';
import { SharedService } from '../../shared/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-event-details',
  standalone: false,
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent {

  tickets: ITicket[] = []

  showEmailDialog = false;
  selectedTicket: any = null;
  recipientEmail: string = '';
  isLoading = false;

  constructor(private ticketService: TicketService, private sharedService: SharedService, private snackBar: MatSnackBar) {

    this.ticketService.getUserTickets().subscribe(data => {
      console.log(data);
      this.tickets = data

    })

  }

  openEmailDialog(ticket: any): void {
    // console.log(ticket);

    this.selectedTicket = ticket.TicketID;
    this.showEmailDialog = true;
    // Pre-fill with user's email if available
    this.recipientEmail = ticket.userEmail || '';
  }

  closeEmailDialog(): void {
    this.showEmailDialog = false;
    this.selectedTicket = null;
    this.recipientEmail = '';
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  sendTicketEmail(): void {
    if (!this.selectedTicket || !this.isValidEmail(this.recipientEmail)) {
      return;
    }

    this.isLoading = true;

    this.ticketService.sendTicketByEmail(
      this.selectedTicket,
      this.recipientEmail
    ).subscribe(
      () => {
        this.isLoading = false;
        this.showEmailDialog = false;
        // Show success message
        this.showNotification('Ticket sent successfully to ' + this.recipientEmail, "success");
      },
      error => {
        this.isLoading = false;
        console.error('Error sending ticket email:', error);
        // Show error message
        this.showNotification('Failed to send ticket. Please try again.', "error");
      }
    );
  }

  showNotification(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info'): void {
    const panelClass = {
      success: 'mat-snack-bar-success',
      error: 'mat-snack-bar-error',
      info: 'mat-snack-bar-info',
      warning: 'mat-snack-bar-warning'
    }[type];

    this.snackBar.open(message, 'Dismiss', {
      duration: 3000,
      verticalPosition: 'bottom', // or 'bottom'
      horizontalPosition: 'center',
      politeness: 'assertive',
       direction: 'ltr',
      panelClass: [panelClass],
      announcementMessage: 'Success notification'
    });
  }



}
