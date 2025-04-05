import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { API_URL } from '../../model/APIURL';
import { BehaviorSubject, Subscription, forkJoin } from 'rxjs';
import { SharedService } from '../../shared/shared.service';
import { IEvent } from '../../model/event.interface';

@Injectable({
  providedIn: 'root'
})
export class UserEventService implements OnDestroy {
  private apiUrl = `${API_URL}/eventuser`;

  public eventList: IEvent[] = [];
  private eventUserListSubject = new BehaviorSubject<IEvent[]>(this.eventList);
  eventUserList$ = this.eventUserListSubject.asObservable();

  private userId = 0;
  private userSubscription: Subscription | null = null;
  private subscriptions: Subscription[] = [];

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.userSubscription = this.sharedService.userId$.subscribe((id) => {
      this.userId = id;
      console.log('UserId:', this.userId);
      this.fetchEventUserList(); // Fetch events when userId updates
    });
    this.subscriptions.push(this.userSubscription);
  }

  private fetchEventUserList(): void {
    if (!this.userId) return;

    const eventUserSub = this.http.get<{ data: any[] }>(`${this.apiUrl}/filter/${this.userId}`)
      .subscribe(response => {
        console.log('Event User Data:', response.data);

        if (!response.data.length) {
          this.eventUserListSubject.next([]);
          return;
        }

        const eventRequests = response.data.map(eventData =>
          this.http.get<{ data: IEvent }>(`${API_URL}/events/filter/${eventData.EventId}`)
          // console.log("EventId",`${API_URL}/events/filter/${eventData.EventId}`);

        );

        const allEventsSub = forkJoin(eventRequests).subscribe(eventResponses => {
          const events = eventResponses.map(res => this.eventList.push(res.data));

          this.eventUserListSubject.next(this.eventList);
        }, error => {
          console.error('Error fetching event data:', error);
          this.eventUserListSubject.next(this.eventList);
        });

        this.subscriptions.push(allEventsSub);
      }, error => {
        console.error('Error fetching event user list:', error);
        this.eventUserListSubject.next(this.eventList);
      });

    this.subscriptions.push(eventUserSub);
  }

  joinEventByUser(eventId: number, userId: number) {
    const data = { EventId: eventId, userId };
    this.http.get<{ data: IEvent }>(`${API_URL}/events/filter/${eventId}`).subscribe((eventData) => {
      this.eventList.push(eventData.data)
      this.eventUserListSubject.next(this.eventList)
    })
    return this.http.post(`${this.apiUrl}/add`, data);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  deleteEventJoinByUser(event_id: number, index: number) {
    this.eventList = this.eventList.filter((item, i) => i !== index);
    this.eventUserListSubject.next(this.eventList);

    return this.http.delete(`${this.apiUrl}/delete/${this.userId}/${event_id}`)
  }
}
