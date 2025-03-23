import { Request, Response } from "express";
import { TicketService } from "../services/ticket.service";
const ticketService = new TicketService();
export class TicketController {


    async addTicket(req: Request, res: Response): Promise<void> {
        try {
            const ticketData = req.body;
            const result = await ticketService.AddTicket(ticketData);
            res.status(201).send(result);
        } catch (error:any) {
            res.status(500).send(error.message);
        }
    }

    async deleteTicket(req: Request, res: Response): Promise<void> {
        try {
            const ticketID = parseInt(req.params.id, 10);
            const result = await ticketService.DeleteTicket(ticketID);
            res.status(200).send(result);
        } catch (error:any) {
            res.status(500).send(error.message);
        }
    }

    async updateTicket(req: Request, res: Response): Promise<void> {
        try {
            const ticketID = parseInt(req.params.id, 10);
            const updatedData = req.body;
            const result = await ticketService.UpdateTicket(ticketID, updatedData);
            res.status(200).send(result);
        } catch (error:any) {
            res.status(500).send(error.message);
        }
    }

    async getAllTickets(req: Request, res: Response): Promise<void> {
        try {
            const tickets = await ticketService.getAllTickets();
            res.status(200).json(tickets);
        } catch (error:any) {
            res.status(500).send(error.message);
        }
    }

    async getFilteredTickets(req: Request, res: Response): Promise<void> {
        try {
            const filterValue = req.query; // Example: filterValue could include fields like EventID or UserID
            const tickets = await ticketService.getFilterTickets(filterValue);
            res.status(200).json(tickets);
        } catch (error:any) {
            res.status(500).send(error.message);
        }
    }
}
