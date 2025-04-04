import { Request, Response } from "express";
import { EventUserService } from "../services/eventUser.service";

const eventUserService = new EventUserService();

export class EventUserController {

    /**
     * @description
     * Add the event
     * @param req 
     * @param res 
     */
    async addEventUser(req: Request, res: Response): Promise<void> {
        try {
            // const eventDTO = plainToInstance(EventDTO, req.body);

            // Validate the EventDTO
            // const trimmedEventDTO = mapValues(eventDTO, (value) => 
            //     typeof value === "string" ? value.trim() : value
            // );
            
            // const errors = await validate(eventDTO);
            // if (errors.length > 0) {
            //     res.status(400).json({
            //         message: "Validation failed, please provide valid data.",
            //         data: errors.map((error: any) => Object.values(error.constraints)),
            //     });
            //     return
            // }
            const eventUserData = req.body
            // Proceed to add the event
            // console.log(eventUserData);
            
            const result = await eventUserService.AddEventUser(eventUserData);
            // console.log(result);
            
            res.status(201).json({ message: "Event successfully created.", data: result });
        } catch (error: any) {
            res.status(500).json({ message: "Internal server error.", data: error.message });
        }
    }

    // Delete EventUser
    async deleteEventUser(req: Request, res: Response): Promise<void> {
        try {
            const user_id = parseInt(req.params.user_id, 10);
            const event_id = parseInt(req.params.event_id,10);

            if (isNaN(user_id && event_id)) {
                res.status(400).json({ message: "Invalid event ID." });
            }

            const result = await eventUserService.DeleteEventUser(user_id,event_id);
            
            res.status(200).json({ message: "Event successfully deleted.", data: result });
        } catch (error: any) {
            res.status(500).json({ message: "Internal server error.", data: error.message });
        }
    }

    async getFilteredEventUser(req: Request, res: Response): Promise<void> {
        try {
            const UserID = parseInt(req.params.userId, 10);

            if (isNaN(UserID)) {
                res.status(400).json({ message: "Invalid User ID." });
            }

            const result = await eventUserService.getFilteredEventUser(UserID);
            res.status(200).json({ message: "Event successfully retrive.", data: result });
        } catch (error: any) {
            res.status(500).json({ message: "Internal server error.", data: error.message });
        }
    }
}