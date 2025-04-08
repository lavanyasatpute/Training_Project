// src/app/models/ticket.model.ts
export enum TicketType {
  REGULAR = 'regular',
  VIP = 'vip',
  VVIP = 'vvip'
}

export interface ITicket {
  TicketID: string;
  Event: any; // Replace `any` with your actual `IEvent` interface if available
  purchaser: any; // Replace `any` with your actual `IUser` interface if available
  TicketType: TicketType;
  PurchaseDate: Date;
  seatNumber?: string;
  Price: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPurchaseTicketData {
  eventId: string;
  ticketType: TicketType;
}