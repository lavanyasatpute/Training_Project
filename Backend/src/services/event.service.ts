import { eventRepo } from "../repository/event.repository";
import { Evententity } from "../entities/event";
import { EventDTO } from "../DTO/event.dto";
import { AppError } from "../utils/appError";

export class EventService {
    private eventRepository = new eventRepo();

    // Add an Event

    async AddEvent(eventData: EventDTO): Promise<string> {
        try {
            const result = await this.eventRepository.AddEvent(eventData);
            return result;
        } catch (error: any) {
            return (`Failed to add event: ${error.message}`);
        }
    }

    // Delete an Event
    async DeleteEvent(eventID: number): Promise<string> {
        try {
            const result = await this.eventRepository.DeleteEvent(eventID);
            return result;
        } catch (error: any) {
            throw new Error(`Failed to delete event with ID ${eventID}: ${error.message}`);
        }
    }

    // Update an Event
    async UpdateEvent(eventID: number, updatedData: Partial<Evententity>): Promise<string> {
        try {
            const result = await this.eventRepository.updateEvent(eventID, updatedData);
            return result;
        } catch (error: any) {
            throw new Error(`Failed to update event with ID ${eventID}: ${error.message}`);
        }
    }

    // Get All Events
    async getAllEvents(): Promise<Evententity[]> {
        try {
            const events = await this.eventRepository.getAllEvent();
            return events;
        } catch (error: any) {
            throw new Error(`Failed to retrivecd  events: ${error.message}`);
        }
    }

    // Filter Events
    async getFilterEvent(filterValue: number) {
        try {
            const events = await this.eventRepository.getFilterEvent(filterValue);
            // console.log("this is from Serive:", events);

            return events;
        } catch (error: any) {
            throw new Error(`Failed to filter events: ${error.message}`);
        }
    }

    async getFilteredEventCreatedByUser(userId: number) {
        if (!userId) throw new AppError("User Id is missimg", 404)
        return await this.eventRepository.getFilterEventCreatedByUser(userId)
    }

}


