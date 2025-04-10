import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../model/APIURL';
import { SharedService } from '../../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private userId = ''
  private apiUrl = API_URL+'/feedback'
  constructor(private http:HttpClient,private sharedService : SharedService) { 
    this.sharedService.userId$.subscribe(id=>{
      this.userId = id;
    })
  }

  feedBack(eventId: string,comments:string,ratings:number){
    return this.http.post(`${this.apiUrl}/add`,{Event:eventId,User:this.userId,Comments:comments,Rating:ratings})
  }

  getAllFeedback(){
    return this.http.get(`${this.apiUrl}/getall`)
  }
}
