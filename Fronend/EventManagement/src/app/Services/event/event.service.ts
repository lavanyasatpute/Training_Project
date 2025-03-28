import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEvent } from '../../model/event.interface';
import { API_URL } from '../../model/APIURL';
import swal from 'sweetalert';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = `${API_URL}/events`;

  eventList: any[] = [];
  private Elist = new BehaviorSubject<any>(this.eventList)
  EList$ = this.Elist.asObservable();


  constructor(private http: HttpClient) {
    const result = this.http.get(`${this.apiUrl}`+'/getall');
    this.eventList.push(result);
    this.Elist.next(this.eventList);
    console.log("this is from event service",result);
    
   }
  createEvent(eventData: Partial<IEvent>): any {
    if (eventData.Title?.trim() !== '' &&
      eventData.Description?.trim() !== '' &&
      eventData.Location?.trim() !== '' &&
      eventData.Categories?.trim() !== ''
    ) {
      swal({
        title: "Event added Successful!",
        text: `Created, ${eventData.Title}!`,
        icon: "success",
        buttons: {
          confirm: {
            text: "Proceed",
            value: true,
            visible: true,
            className: "",
            closeModal: true
          }
        }
      });
      this.eventList.push(eventData);
      this.Elist.next(this.eventList);
      const headers = { 'Content-Type': 'application/json' };
      return this.http.post(this.apiUrl + '/add', eventData, { headers })
    } else {
      // Show error alert for invalid form data
      swal({
        title: "Invalid Input!",
        text: "Please ensure all fields are filled correctly.",
        icon: "error",
        buttons: {
          confirm: {
            text: "Try Again",
            value: true,
            visible: true,
            className: "",
            closeModal: true
          }
        }
      });
      return "Please enter a valid data..."
    }
  }


}
