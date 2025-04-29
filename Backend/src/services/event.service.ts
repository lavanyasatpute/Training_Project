import { eventRepo } from "../repository/event.repository";
import { Evententity } from "../entities/event";
import { EventDTO } from "../DTO/event.dto";
import { AppError } from "../utils/appError";

export class EventService {
    private eventRepository = new eventRepo();

    // Add an Event

    async AddEvent(eventData: EventDTO, creatorId: string): Promise<string | any> {
        try {
            const result = await this.eventRepository.createEvent(eventData, creatorId);
            return result;
        } catch (error: any) {
            throw (`Failed to add event: ${error.message}`);
        }
    }

    // Delete an Event
    async DeleteEvent(eventID: string): Promise<string | any> {
        try {
            const result = await this.eventRepository.DeleteEvent(eventID);
            return result;
        } catch (error: any) {
            throw new AppError(`Failed to delete event with ID ${eventID}: ${error.message}`, 200);
        }
    }

    // Update an Event
    async UpdateEvent(eventID: string, updatedData: Partial<Evententity>): Promise<string | any> {
        try {
            console.log(updatedData);
            
            const result = await this.eventRepository.updateEvent(eventID, updatedData);
            return result;
        } catch (error: any) {
            throw new AppError(`Failed to update event with ID ${eventID}: ${error.message}`, 400);
        }
    }

    // Get All Events
    async getAllEvents(): Promise<Evententity[] | any> {
        try {
            const events = await this.eventRepository.getAllEvent();
            return events;
        } catch (error: any) {
            throw new AppError(`Failed to retrivecd  events: ${error.message}`, 200);
        }
    }

    // Filter Events
    async getFilterEvent(filterValue: string) {
        try {
            const events = await this.eventRepository.getFilterEvent(filterValue);
            // console.log("this is from Serive:", events);

            return events;
        } catch (error: any) {
            throw new AppError(`Failed to filter events: ${error.message}`, 200);
        }
    }

    async getFilteredEventCreatedByUser(userId: string) {
        if (!userId) return new AppError("User Id is missimg", 404)
        return await this.eventRepository.getFilterEventCreatedByUser(userId)
    }

    async aprroveEventFromService(event_id: string, user_id: string, aprrovalValue: boolean) {
        if (!event_id && !aprrovalValue) {
            return new AppError("EventId and Aprroval Status is not found in a service", 200)
        }
        return await this.eventRepository.aprroveEvent(event_id, user_id, aprrovalValue);
    }

    async getAllEventFromServiceForAdmin() {
        return await this.eventRepository.getAllEventForAdmin()
    }

}


