import { AppDataSource } from "../config/data-source";
import { Ticket } from "../entities/Ticket";

export class ticketRepo {
    private appDataSource = AppDataSource.getRepository(Ticket);

    // Add a Ticket
    async AddTicket(ticketData: Partial<Ticket>) {
        const ticket = this.appDataSource.create(ticketData);
        await this.appDataSource.save(ticket);
        return `Ticket successfully purchased for Event ID: ${ticket.TicketID} by User ID: ${ticket.User}`;
    }

    // Delete a Ticket
    async DeleteTicket(ticketID: number) {
        const ticket = await this.appDataSource.findOne({ where: { TicketID: ticketID } });
        if (!ticket) throw new Error(`Ticket with ID ${ticketID} not found.`);
        await this.appDataSource.delete(ticketID);
        return `Ticket with ID ${ticketID} has been deleted successfully.`;
    }

    // Update a Ticket
    async UpdateTicket(ticketID: number, updatedData: Partial<Ticket>) {
        const ticket = await this.appDataSource.findOne({ where: { TicketID: ticketID } });
        if (!ticket) throw new Error(`Ticket with ID ${ticketID} not found.`);
        await this.appDataSource.update(ticketID, updatedData);
        return `Ticket with ID ${ticketID} has been updated successfully.`;
    }

    // Get All Tickets
    async getAllTickets() {
        return await this.appDataSource.find();
    }

    // Filter Tickets by Specific Criteria
    async getFilterTickets(filterValue: Partial<Ticket>) {
        return await this.appDataSource.find({ where: filterValue });
    }
}
