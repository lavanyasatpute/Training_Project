import { EventEmitter } from "typeorm/platform/PlatformTools";
import { AppDataSource } from "../config/data-source";
import { Ticket, TicketType } from "../entities/Ticket";
import { User } from "../entities/User";
import { Evententity } from "../entities/event";
import { PurchaseTicketDto } from "../DTO/ticket.dto";
import { AppError } from "../utils/appError";

export class ticketRepo {
    private ticketRepository = AppDataSource.getRepository(Ticket);
    private userRepository = AppDataSource.getRepository(User);
    private eventRepository = AppDataSource.getRepository(Evententity);

    // Add a Ticket

    async purchaseTicket(purchaseTicketDto: PurchaseTicketDto, userId: string): Promise<string> {
        const { eventId, ticketType } = purchaseTicketDto;

        const user = await this.userRepository.findOne({ where: { UserID: userId } });
        if (!user) {
            throw new AppError('User not found', 401);
        }

        const event = await this.eventRepository.findOne({ where: { EventID: eventId } });
        if (!event) {
            throw new AppError('Event not found', 401);
        }

        if (event.availableSeats <= 0) {
            throw new AppError('No seats available for this event', 401);
        }

        let price: number;

        switch (ticketType) {
            case TicketType.REGULAR:
                price = event.regularPrice;
                break;
            case TicketType.VIP:
                price = event.vipPrice;
                break;
            case TicketType.VVIP:
                price = event.vvipPrice;
                break;
            default:
                throw new AppError('Invalid ticket type', 400);
        }

        const seatNumber = `S-${event.totalSeats - event.availableSeats + 1}`;

        const ticket = this.ticketRepository.create({
            TicketType: ticketType,
            Price: price,
            Event: event,
            purchaser: user,
            seatNumber: seatNumber
        });

        event.availableSeats -= 1;

        await this.eventRepository.save(event);
        await this.ticketRepository.save(ticket);

        return 'Ticket purchased successfully.';
    }

    // async AddTicket(ticketData: Partial<Ticket>) {
    //     const ticket = this.appDataSource.create(ticketData);
    //     await this.appDataSource.save(ticket);
    //     return `Ticket successfully purchased for Event ID: ${ticket.TicketID} by User ID: ${ticket.User}`;
    // }

    // Delete a Ticket
    async DeleteTicket(ticketID: number) {
        const ticket = await this.ticketRepository.findOne({ where: { TicketID: ticketID } });
        if (!ticket) throw new AppError(`Ticket with ID ${ticketID} not found.`, 401);
        await this.ticketRepository.update(ticketID, { isActive: false });
        return `Ticket with ID ${ticketID} has been deleted successfully.`;
    }

    // Update a Ticket
    async UpdateTicket(ticketID: number, updatedData: Partial<Ticket>) {
        const ticket = await this.ticketRepository.findOne({ where: { TicketID: ticketID } });
        if (!ticket) throw new AppError(`Ticket with ID ${ticketID} not found.`, 401);
        await this.ticketRepository.update(ticketID, updatedData);
        return `Ticket with ID ${ticketID} has been updated successfully.`;
    }

    // Get All Tickets
    async getUserTickets(userId: string): Promise<Ticket[]> {
        return this.ticketRepository.find({
            where: { purchaser: { UserID: userId } },
            relations: ['Event'],
        });
    }

    async getEventTickets(eventId: string): Promise<Ticket[]> {
        return this.ticketRepository.find({
            where: { Event: { EventID: eventId } },
            relations: ['purchaser']
        });
    }

    // Filter Tickets by Specific Criteria
    async getFilterTickets(filterValue: Partial<Ticket>) {
        return await this.ticketRepository.find({ where: filterValue });
    }
}
