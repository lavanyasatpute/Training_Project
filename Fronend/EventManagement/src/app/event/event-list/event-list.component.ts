import { Component, OnInit } from '@angular/core';
import { EventService } from '../../Services/event/event.service';
import { fadeInAnimation } from '../../angular-animation/animations';
import { SharedService } from '../../shared/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from '../../shared/generic-dialog/generic-dialog.component';
import { UserEventService } from '../../Services/UserEvent/user-event.service';
import { debounce } from 'lodash';
import { IEvent } from '../../model/event.interface';
import { ITicket, TicketType } from '../../model/ticket.interface';
import { TicketService } from '../../Services/ticket/ticket.service';

@Component({
  selector: 'app-event-list',
  standalone: false,
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  animations: [fadeInAnimation]
})
export class EventListComponent implements OnInit {
  eventList: IEvent[] = [];
  filteredEvent: IEvent[] = [];
  user = false;
  userId = '';

  regularticket: TicketType = TicketType.REGULAR;
  vipticket: TicketType = TicketType.VIP;
  vvipticket: TicketType = TicketType.VVIP;

  constructor(
    private eventService: EventService,
    private sharedService: SharedService,
    private dialog: MatDialog,
    private userEventService: UserEventService,
    private ticketService: TicketService
  ) {
    this.eventService.EList$.subscribe(data => {
      this.eventList = data;
    });
    this.debouncedSearch = debounce(this.filterEvents.bind(this), 300);
  }

  ngOnInit() {
    this.sharedService.username$.subscribe(name => {
      this.user = name !== 'User';
    });

    this.sharedService.userId$.subscribe(id => {
      this.userId = id;
    });

    this.filteredEvent = [...this.eventList];
  }

  getTicketPrice(event: IEvent, ticketType: string): number {
    switch (ticketType) {
      case TicketType.VIP:
        return event.vipPrice;
      case TicketType.VVIP:
        return event.vvipPrice;
      default:
        return event.regularPrice;
    }
  }

  openDialog(event: IEvent, ticketValue: string) {
    const [Ticketprice, ticketTypeStr] = ticketValue.split('|');
    const ticketPrice = parseFloat(Ticketprice);
    const ticketType = ticketTypeStr as TicketType; // cast to enum

    this.dialog.open(GenericDialogComponent, {
      data: {
        title: `Register for ${event.Title}`,
        eventId: event.EventID,
        Event: `You are about to register for Event: ${event.Title}`,
        button: "Join",
        Ticket_Price: ticketPrice,
        Ticket_Type: ticketType
      }
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.joinEvent(event.EventID, ticketType);
    });
    
  }


  formatOption(price: number, type: string): string {
    return `${price}|${type}`;
  }

  joinEvent(eventId: string, ticketType: TicketType) {
    this.userEventService.joinEvent(eventId, this.userId).subscribe((data: any) => {
      console.log("Event joined:", data, "Ticket Type:", ticketType);
      this.ticketService.purchaseTicket({ eventId, ticketType }).subscribe(data => {
        console.log(data);

      });
    });


  }
  searchKeyword: string = '';
  onSearchChange() {
    this.debouncedSearch();
  }

  filterEvents() {
    const keyword = this.searchKeyword.trim().toLowerCase();

    if (!keyword) {
      this.filteredEvent = [...this.eventList]; // show all if no keyword
      return;
    }

    this.filteredEvent = this.eventList.filter(event =>
      Object.values(event).some(value =>
        String(value).toLowerCase().includes(keyword)
      )
    );
  }

  debouncedSearch: () => void;

}
