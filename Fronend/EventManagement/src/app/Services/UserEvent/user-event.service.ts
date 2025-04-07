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
  private eventListSubject = new BehaviorSubject<IEvent[]>([]);
  public eventList$ = this.eventListSubject.asObservable();

  private currentUserId: string = '';
  private subscriptions: Subscription[] = [];

  constructor(private http: HttpClient, private sharedService: SharedService) {
    const userSub = this.sharedService.userId$.subscribe((id) => {
      this.currentUserId = id;
      console.log('UserId:', this.currentUserId);
      this.fetchUserJoinedEvents();
    });
    this.subscriptions.push(userSub);
  }

  /**
   * Fetch all events that the current user has joined.
   */
  private fetchUserJoinedEvents(): void {
    if (!this.currentUserId) return;

    const sub = this.http.get<{ data: any[] }>(`${this.apiUrl}/filter/${this.currentUserId}`)
      .subscribe(response => {
        const eventUserRelations = response.data;

        if (!eventUserRelations.length) {
          this.eventList = [];
          this.eventListSubject.next([]);
          return;
        }

        const eventRequests = eventUserRelations.map(relation =>
          this.http.get<{ data: IEvent }>(`${API_URL}/events/filter/${relation.eventId}`)
        );

        const allEventsSub = forkJoin(eventRequests).subscribe(eventResponses => {
          this.eventList = eventResponses.map(res => res.data);
          this.eventListSubject.next(this.eventList);
        }, error => {
          console.error('Error fetching event data:', error);
          this.eventListSubject.next([]);
        });

        this.subscriptions.push(allEventsSub);
      }, error => {
        console.error('Error fetching user-event relations:', error);
        this.eventListSubject.next([]);
      });

    this.subscriptions.push(sub);
  }

  /**
   * Join an event for the user and update state.
   */
  joinEvent(eventId: string, userId: string) {
    const payload = { eventId, userId };

    const sub = this.http.get<{ data: IEvent }>(`${API_URL}/events/filter/${eventId}`)
      .subscribe((eventResponse) => {
        this.eventList.push(eventResponse.data);
        this.eventListSubject.next(this.eventList);
      });

    this.subscriptions.push(sub);

    return this.http.post(`${this.apiUrl}/add`, payload);
  }

  /**
   * Leave (delete) an event join relation by event ID.
   */
  leaveEvent(eventId: string, index: number) {
    this.eventList.splice(index, 1);
    this.eventListSubject.next(this.eventList);

    return this.http.delete(`${this.apiUrl}/delete/${this.currentUserId}/${eventId}`);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
