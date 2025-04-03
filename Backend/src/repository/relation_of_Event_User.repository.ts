import { AppDataSource } from "../config/data-source";
import { Evententity } from "../entities/event";
import { RelationOfEventUser } from "../entities/relation_between_events_user";
import { User } from "../entities/User";
import { Equal } from "typeorm";

export class EventUserRepo {
    private appDataSource = AppDataSource.getRepository(RelationOfEventUser);
    private appDataSourceEvent = AppDataSource.getRepository(Evententity);
    private appDataSourceUser = AppDataSource.getRepository(User);

    async AddEventUser(eventUser: Partial<RelationOfEventUser>) {
        try {
            // Validate required fields
            // console.log(eventUser);
            
            if (!eventUser.EventId) return "Error: Please enter an event ID";
            if (!eventUser.userId) return "Error: Please enter a user ID";

            // Fetch event and user details
            const eventName = await this.appDataSourceEvent.findOne({ where: { EventID: Number(eventUser.EventId) } });
            if (!eventName) return "Error: Event not found";

            const userName = await this.appDataSourceUser.findOne({ where: { UserID: Number(eventUser.userId) } });
            if (!userName) return "Error: User not found";

            // Create and save event user relation
            const eventUserRelation = this.appDataSource.create(eventUser);
            await this.appDataSource.save(eventUserRelation);

            return `Event ${eventName.Title} joined successfully by ${userName.Name}`;
        } catch (error) {
            console.error("Error adding event user:", error);
            return "Error: Could not add event user.";
        }
    }

    async DeleteEventUser(id: number) {
        try {
            const eventUser = await this.appDataSource.findOne({ where: { id } });
            if (!eventUser) return `Error: Event with ID ${id} not found`;

            await this.appDataSource.delete(id);
            return `Event with ID ${id} has been deleted successfully.`;
        } catch (error) {
            console.error("Error deleting event user:", error);
            return "Error: Could not delete event user.";
        }
    }

    async getAllEventUser() {
        try {
            const data = await this.appDataSource.find();
            return data.length ? data : "No event users found.";
        } catch (error) {
            console.error("Error fetching all event users:", error);
            return "Error: Could not retrieve event users.";
        }
    }

    async getFilteredEventUser(Id: number) {
        try {
            if (!Id || isNaN(Id)) return "Error: Invalid user ID";
    
            const data:RelationOfEventUser[] = await this.appDataSource.find({ where: { userId: Equal(Id) } });
    
            return data.length ? data : "No event users found.";
        } catch (error) {
            console.error("Error fetching filtered event users:", error);
            return "Error: Could not retrieve event users.";
        }
    }
    
}
