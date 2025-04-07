import { Request, Response } from "express";
import { EventService } from "../services/event.service";
import { EventDTO } from "../DTO/event.dto";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
const redis =require("redis");

const eventService = new EventService();

const client = redis.createClient();
client.connect();

export class EventController {

    /**
     * @description
     * Add the event
     * @param req 
     * @param res 
     */
    async addEvent(req: Request, res: Response): Promise<void> {
        try {
            const eventDTO = plainToInstance(EventDTO, req.body);
            const createrId = req.params.id;

            // Validate the EventDTO
            // const trimmedEventDTO = mapValues(eventDTO, (value) => 
            //     typeof value === "string" ? value.trim() : value
            // );

            const errors = await validate(eventDTO);
            if (errors.length > 0) {
                res.status(400).json({
                    message: "Validation failed, please provide valid data.",
                    data: errors.map((error: any) => Object.values(error.constraints)),
                });
                return
            }

            // Proceed to add the event
            const result = await eventService.AddEvent(eventDTO, createrId);
            res.status(201).json({ message: "Event successfully created.", data: result });
        } catch (error: any) {
            res.status(500).json({ message: "Internal server error.", data: error.message });
        }
    }

    // Delete Event
    async deleteEvent(req: Request, res: Response): Promise<void> {
        try {
            const eventID = req.params.id;

            if (!(eventID)) {
                res.status(400).json({ message: "Invalid event ID." });
                return
            }

            const result = await eventService.DeleteEvent(eventID);
            res.status(200).json({ message: "Event successfully deleted.", data: result });
        } catch (error: any) {
            res.status(500).json({ message: "Internal server error.", data: error.message });
        }
    }

    // Update Event
    async updateEvent(req: Request, res: Response): Promise<void> {
        try {
            const eventID = req.params.id;

            if (!(eventID)) {
                res.status(400).json({ message: "Invalid event ID." });
                return
            }

            const updatedData = req.body;

            // Perform validation if necessary
            const eventDTO = plainToInstance(EventDTO, updatedData);
            const errors = await validate(eventDTO);
            if (errors.length > 0) {
                res.status(400).json({
                    message: "Validation failed, please provide valid data.",
                    errors: errors.map((error: any) => Object.values(error.constraints)),
                });
                return
            }

            const result = await eventService.UpdateEvent(eventID, updatedData);
            res.status(200).json({ message: "Event successfully updated.", data: result });
        } catch (error: any) {
            res.status(500).json({ message: "Internal server error.", data: error.message });
        }
    }

    // Get All Events
    async getAllEvents(req: Request, res: Response): Promise<void> {
        try {
            const cacheKey = 'allEvent';
            const cached = await client.get(cacheKey);

            if (cached) {
                res.status(200).json({ message: "Events retrieved successfully.", data: JSON.parse(cached) });
                return 
            }
            const events = await eventService.getAllEvents();
            await client.set(cacheKey, JSON.stringify(events), { EX: 600 })
            res.status(200).json({ message: "Events retrieved successfully.", data: events });
        } catch (error: any) {
            res.status(500).json({ message: "Internal server error.", data: error.message });
        }
    }

    // Get Filtered Events
    async getFilteredEvents(req: Request, res: Response): Promise<void> {
        try {
            const filterValue = req.params.id; // Example: filterValue could include fields like Location or Categories

            const events = await eventService.getFilterEvent((filterValue));
            res.status(200).json({ message: "Filtered events retrieved successfully.", data: events });
        } catch (error: any) {
            res.status(500).json({ message: "Internal server error.", data: error.message });
        }
    }

    async getFilteredEventCreatedByUser(req: Request, res: Response) {
        try {
            const id = req.params.id; // Example: filterValue could include fields like Location or Categories

            const events = await eventService.getFilteredEventCreatedByUser((id));
            res.status(200).json({ message: "Filtered events retrieved successfully.", data: events });
        } catch (error: any) {
            res.status(500).json({ message: "Internal server error.", data: error.message });
        }
    }
}
