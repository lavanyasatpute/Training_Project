import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEventFormData, IEvent } from '../../model/event.interface';
import { API_URL } from '../../model/APIURL';
import swal from 'sweetalert';
import { BehaviorSubject, Observable } from 'rxjs';
import { SharedService } from '../../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = `${API_URL}/events`;

  private AllLocation: string[] = [];
  private Locationlist = new BehaviorSubject<any>(this.AllLocation);
  Locationlist$ = this.Locationlist.asObservable();

  private eventList: any[] = [];
  private Elist = new BehaviorSubject<any>(this.eventList);
  EList$ = this.Elist.asObservable();

  private userId = "";
  private EventListCreatedByUser: any[] = [];
  private eventcreateByUserSubject = new BehaviorSubject<any>(this.EventListCreatedByUser);
  eventCreateByUser$ = this.eventcreateByUserSubject.asObservable();

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.loadAllEvents();
    this.listenToUserIdChanges();
  }

  //  getEventById(id: string): Observable<Event> {
  //   return this.http.get<Event>(`${this.apiUrl}/${id}`);
  // }

  
  getEventStats(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/stats`);
  }

  //  Load all events and update shared observables
  private loadAllEvents(): void {
    this.http.get(`${this.apiUrl}/getall`).subscribe((response: any) => {
      console.log("Event Service for check the event id", response.data.EventID);

      this.eventList = response.data || [];
      this.AllLocation = this.eventList.map((event: any) => event.Location);
      this.Elist.next(this.eventList);
      this.Locationlist.next(this.AllLocation);
    });
  }

  //  Subscribe to shared user ID and fetch events created by that user
  private listenToUserIdChanges(): void {
    this.sharedService.userId$.subscribe(id => {
      this.userId = id;
      console.log("EventService → User ID:", this.userId);
      this.loadEventsCreatedByUser(this.userId);
    });
  }

  //  Load events created by a specific user
  private loadEventsCreatedByUser(userId: string): void {
    this.http.get(`${this.apiUrl}/created-event/${userId}`).subscribe((response: any) => {
      this.EventListCreatedByUser = response.data || [];
      this.eventcreateByUserSubject.next(this.EventListCreatedByUser);
    });
  }

  //  Delete event created by user
  deleteEventCreatedByUser(eventId: string, index: number) {
    this.EventListCreatedByUser = this.EventListCreatedByUser.filter((_, i) => i !== index);
    this.eventcreateByUserSubject.next(this.EventListCreatedByUser);

    this.eventList = this.eventList.filter(item => item.EventID !== eventId)
    this.Elist.next(this.eventList);

    return this.http.delete(`${this.apiUrl}/delete/${eventId}`);
  }

  // Update event created by user
  updateEventCreatedByUser(eventId: string, eventData: Partial<IEvent>): Observable<any> {
    if (this.isEventDataValid(eventData)) {
      // Update the event in EventListCreatedByUser
      const eventIndex = this.EventListCreatedByUser.findIndex(event => event.EventID === eventId);
      if (eventIndex !== -1) {
        this.EventListCreatedByUser[eventIndex] = { ...this.EventListCreatedByUser[eventIndex], ...eventData };
        this.eventcreateByUserSubject.next([...this.EventListCreatedByUser]);
      }

      // Update the event in eventList
      const mainEventIndex = this.eventList.findIndex(event => event.EventID === eventId);
      if (mainEventIndex !== -1) {
        this.eventList[mainEventIndex] = { ...this.eventList[mainEventIndex], ...eventData };
        this.Elist.next([...this.eventList]);
      }

      // If the location has changed, update location list
      if (eventData.Location) {
        if (!this.AllLocation.includes(eventData.Location)) {
          this.AllLocation.push(eventData.Location);
          this.Locationlist.next([...this.AllLocation]);
        }
      }

      // Show success message
      swal({
        title: "Event updated Successfully!",
        text: `Updated: ${eventData.Title}`,
        icon: "success",
        buttons: { confirm: { text: "OK", value: true, visible: true, closeModal: true } }
      });

      // Send request to backend
      const headers = { 'Content-Type': 'application/json' };
      return this.http.patch(`${this.apiUrl}/update/${eventId}`, eventData, { headers });
    } else {
      swal({
        title: "Invalid Input!",
        text: "Please ensure all fields are filled correctly.",
        icon: "error",
        buttons: { confirm: { text: "Try Again", value: true, visible: true, closeModal: true } }
      });
      throw new Error("Please enter valid data...");
    }
  }

  // ➕ Create a new event

  createEvent(eventData: IEventFormData): Observable<Event> | string {
    if (this.isEventDataValid(eventData)) {
      swal({
        title: "Event added Successfully!",
        text: `Created: ${eventData.Title}`,
        icon: "success",
        buttons: { confirm: { text: "Proceed", value: true, visible: true, closeModal: true } }
      });

      this.eventList.push(eventData);
      this.Elist.next(this.eventList);

      if (eventData.Location) {
        this.AllLocation.push(eventData.Location);
        this.Locationlist.next(this.AllLocation);
      }

      this.EventListCreatedByUser.push(eventData);
      this.eventcreateByUserSubject.next(this.EventListCreatedByUser);

      const headers = { 'Content-Type': 'application/json' };

      return this.http.post<Event>(this.apiUrl + '/add', eventData, { headers });

    } else {
      swal({
        title: "Invalid Input!",
        text: "Please ensure all fields are filled correctly.",
        icon: "error",
        buttons: { confirm: { text: "Try Again", value: true, visible: true, closeModal: true } }
      });
      return "Please enter a valid data...";
    }
  }

  // Validate event form input
  private isEventDataValid(eventData: Partial<IEventFormData>): boolean {
    return !!(eventData.Title?.trim() &&
      eventData.Description?.trim() &&
      eventData.Location?.trim() &&
      eventData.Categories?.trim());
  }
}