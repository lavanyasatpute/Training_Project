import { MoreThanOrEqual } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Evententity } from "../entities/event";
import { RelationOfEventUser } from "../entities/relation_between_events_user";
import { Ticket } from "../entities/Ticket";
import { User } from "../entities/User";
import { AppError } from "../utils/appError";

export class EventUserRepo {
    private appDataSource = AppDataSource.getRepository(RelationOfEventUser);
    private appDataSourceEvent = AppDataSource.getRepository(Evententity);
    private appDataSourceUser = AppDataSource.getRepository(User);
    private ticketRepository = AppDataSource.getRepository(Ticket)

    async AddEventUser(eventUser: Partial<RelationOfEventUser>) {
        try {
            // Validate required fields
            if (!eventUser.eventId) throw new AppError("Error: Please enter an event ID", 400);
            if (!eventUser.userId) throw new AppError("Error: Please enter a user ID", 400);

            // Fetch event and user details
            const event = await this.appDataSourceEvent.findOne({
                where: { EventID: eventUser.eventId }
            });

            if (!event) throw new AppError("Error: Event not found", 400);

            const user = await this.appDataSourceUser.findOne({
                where: { UserID: eventUser.userId }
            });

            if (!user) throw new AppError("Error: User not found", 400);

            // Create and save event user relation
            // console.log(eventUser);
            // console.log(event);
            // console.log(user);



            const eventUserRelation = this.appDataSource.create({ user: user, event: event });
            await this.appDataSource.save(eventUserRelation);

            return `Event ${event.Title} joined successfully by ${user.Name}`;
        } catch (error) {
            console.error("Error adding event user:", error);
            throw new AppError("Error: Could not add event user.", 401);
        }
    }

    async DeleteEventUser(userId: string, eventId: string) {
        try {
            const eventUser = await this.appDataSource.findOne({
                where: {
                    userId: userId,
                    eventId: eventId
                }
            });

            if (!eventUser) {
                throw new AppError(`Error: EventUser relationship not found`, 401);
            }

            const ticket = await this.ticketRepository.findOne({
                where: { purchaser: { UserID: userId }, Event: { EventID: eventId }, isActive: true }
            });

            if (ticket) {
                await this.ticketRepository.update(ticket.TicketID, { isActive: false });
            }

            await this.appDataSource.delete(eventUser.id);

            return `EventUser relationship has been deleted successfully.`;
        } catch (error) {
            console.error("Error deleting event user:", error);
            throw new AppError("Could not delete event user.", 500);
        }
    }


    async getAllEventUser() {
        try {
            const data = await this.appDataSource.find({
                relations: ['user', 'event']
            });

            return data.length ? data : "No event users found.";
        } catch (error) {
            console.error("Error fetching all event users:", error);
            return "Error: Could not retrieve event users.";
        }
    }

    async getFilteredEventUser(userId: string) {
        try {
            if (!userId) throw new AppError("Error: Invalid user ID", 401);
            const currentDate = new Date()

            const data = await this.appDataSource.find({
                where: { userId,event:{Schedule:MoreThanOrEqual(currentDate)} },
                relations: ['user', 'event']
            });

            return data.length ? data : "No event users found.";
        } catch (error) {
            console.error("Error fetching filtered event users:", error);
            return "Error: Could not retrieve event users.";
        }
    }
}