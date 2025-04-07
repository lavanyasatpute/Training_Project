// src/app/models/event.model.ts
export interface IEvent {
  EventID: string;
  Title: string;
  Description: string;
  Schedule: Date;
  Location: string;
  
  Categories:string
  regularPrice: number;
  vipPrice: number;
  vvipPrice: number;
  totalSeats: number;
  availableSeats: number;
  CreatedBy?: any;
  Tickets?: any[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IEventFormData {
  Title: string;
  Schedule: Date;
  Location: string;
  Description: string;
  Categories: string;
  regularPrice: number;
  vipPrice: number;
  vvipPrice: number;
  totalSeats: number;
}