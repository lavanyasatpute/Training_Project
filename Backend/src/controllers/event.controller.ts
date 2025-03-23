import { Request, Response } from "express";
import { EventService } from "../services/event.service";

export class EventController {
    private eventService = new EventService();

    async addEvent(req: Request, res: Response): Promise<void> {
        try {
            const eventData = req.body;
            const result = await this.eventService.AddEvent(eventData);
            res.status(201).send(result);
        } catch (error:any) {
            res.status(500).send(error.message);
        }
    }

    async deleteEvent(req: Request, res: Response): Promise<void> {
        try {
            const eventID = parseInt(req.params.id, 10);
            const result = await this.eventService.DeleteEvent(eventID);
            res.status(200).send(result);
        } catch (error:any) {
            res.status(500).send(error.message);
        }
    }

    async updateEvent(req: Request, res: Response): Promise<void> {
        try {
            const eventID = parseInt(req.params.id, 10);
            const updatedData = req.body;
            const result = await this.eventService.UpdateEvent(eventID, updatedData);
            res.status(200).send(result);
        } catch (error:any) {
            res.status(500).send(error.message);
        }
    }

    async getAllEvents(req: Request, res: Response): Promise<void> {
        try {
            const events = await this.eventService.getAllEvents();
            res.status(200).json(events);
        } catch (error:any) {
            res.status(500).send(error.message);
        }
    }

    async getFilteredEvents(req: Request, res: Response): Promise<void> {
        try {
            const filterValue = req.query; // Example: filterValue could include fields like Location or Categories
            const events = await this.eventService.getFilterEvent(filterValue);
            res.status(200).json(events);
        } catch (error:any) {
            res.status(500).send(error.message);
        }
    }
}
