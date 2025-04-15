// src/app/services/ticket.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITicket, IPurchaseTicketData } from '../../model/ticket.interface';
import { API_URL } from '../../model/APIURL';
import { SharedService } from '../../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = `${API_URL}/tickets`;

  private user_id:string = ''

  constructor(private http: HttpClient,private sharedService:SharedService) {
    this.sharedService.userId$.subscribe(user_id=>{
      this.user_id = user_id
    });
  }

  purchaseTicket(ticketData: IPurchaseTicketData){
    
    return this.http.post(`${this.apiUrl}/tickets/${this.user_id}`, ticketData);
  }

  getUserTickets(): Observable<ITicket[]> {
    return this.http.get<ITicket[]>(`${this.apiUrl}/my-tickets/${this.user_id}`);
  }

  getEventTickets(eventId: string): Observable<ITicket[]> {
    return this.http.get<ITicket[]>(`${this.apiUrl}/event/${eventId}`);
  }

  /**
   * Send ticket details to a specific email address
   * @param ticketId The ID of the ticket to send
   * @param email The recipient's email address
   * @returns Observable with the response from the server
   */
  sendTicketByEmail(ticketId: string, email: string): Observable<any> {
    console.log("from ticket service",ticketId,email);
    
    return this.http.post<any>(this.apiUrl+'/email', {
      ticketId,
      email
    });
  }
}