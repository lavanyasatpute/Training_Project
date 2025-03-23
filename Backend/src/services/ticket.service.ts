import { ticketRepo } from "../repository/ticket.repository";
import { Ticket } from "../entities/Ticket";

export class TicketService {
    private ticketRepository = new ticketRepo();

    // Add a Ticket
    async AddTicket(ticketData: Partial<Ticket>): Promise<string> {
        try {
            const result = await this.ticketRepository.AddTicket(ticketData);
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
    async getAllTickets(): Promise<Ticket[]> {
        try {
            const tickets = await this.ticketRepository.getAllTickets();
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
