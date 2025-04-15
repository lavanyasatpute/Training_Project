// src/dto/purchase-ticket.dto.ts
import { IsNotEmpty, IsUUID, IsEnum } from 'class-validator';
import { TicketType } from '../entities/Ticket';

export class PurchaseTicketDto {
  @IsNotEmpty()
  eventId: string;

  @IsNotEmpty()
  @IsEnum(TicketType)
  ticketType: TicketType;
}