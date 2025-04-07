import { ticketRepo } from "../repository/ticket.repository";
import { Ticket } from "../entities/Ticket";
import { PurchaseTicketDto } from "../DTO/ticket.dto";

export class TicketService {
    private ticketRepository = new ticketRepo();

    // Add a Ticket
    async AddTicket(purchaseTicketDto: PurchaseTicketDto, userId: string): Promise<string> {
        try {
            const result = await this.ticketRepository.purchaseTicket(purchaseTicketDto,userId);
            return result;
        } catch (error:any) {
            throw new Error(`Failed to add ticket: ${error.message}`);
        }
    }

    // Delete a Ticket
    async DeleteTicket(ticketID: number): Promise<string> {
        try {
            const result = await this.ticketRepository.DeleteTicket(ticketID);
            return result;
        } catch (error:any) {
            throw new Error(`Failed to delete ticket with ID ${ticketID}: ${error.message}`);
        }
    }

    // Update a Ticket
    async UpdateTicket(ticketID: number, updatedData: Partial<Ticket>): Promise<string> {
        try {
            const result = await this.ticketRepository.UpdateTicket(ticketID, updatedData);
            return result;
        } catch (error:any) {
            throw new Error(`Failed to update ticket with ID ${ticketID}: ${error.message}`);
        }
    }

    // Get All Tickets
    async getUserTickets(userId: string): Promise<Ticket[]> {
        try {
            const tickets = await this.ticketRepository.getUserTickets(userId);
            return tickets;
        } catch (error:any) {
            throw new Error(`Failed to retrieve tickets: ${error.message}`);
        }
    }

    // Filter Tickets
    async getFilterTickets(filterValue: Partial<Ticket>): Promise<Ticket[]> {
        try {
            const tickets = await this.ticketRepository.getFilterTickets(filterValue);
            return tickets;
        } catch (error:any) {
            throw new Error(`Failed to filter tickets: ${error.message}`);
        }
    }
}
