import { Request, Response } from "express";
import { TicketService } from "../services/ticket.service";
import { PurchaseTicketDto } from "../DTO/ticket.dto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
const sendTicketToEmail =require('../services/email.service')
const ticketService = new TicketService();
export class TicketController {


    async addTicket(req: Request, res: Response): Promise<void> {
        try {
            const ticketDto = plainToInstance(PurchaseTicketDto, req.body);

            const errors = await validate(ticketDto);
            if (errors.length > 0) {
                res.status(400).json({
                    message: "Validation failed, please provide valid data.",
                    data: errors.map((error: any) => Object.values(error.constraints)),
                });
                return
            }
            const user_Id = req.params.userId;
            const result = await ticketService.AddTicket(ticketDto, user_Id);
            // console.log(result);
            
            res.status(201).json({data:result});
        } catch (error: any) {
            res.status(404).send(error.message);
        }
    }

    async deleteTicket(req: Request, res: Response): Promise<void> {
        try {
            const ticketID = parseInt(req.params.id, 10);
            const result = await ticketService.DeleteTicket(ticketID);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }

    async updateTicket(req: Request, res: Response): Promise<void> {
        try {
            const ticketID = parseInt(req.params.id, 10);
            const updatedData = req.body;
            const result = await ticketService.UpdateTicket(ticketID, updatedData);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }

    async getUserTickets(req: Request, res: Response): Promise<void> {
        try {
            const userid = req.params.userId;
            const tickets = await ticketService.getUserTickets(userid);
            // console.log(tickets);
            
            res.status(200).json(tickets);
        } catch (error: any) {
            res.status(404).send(error.message);
        }
    }

    async getFilteredTickets(req: Request, res: Response): Promise<void> {
        try {
            const filterValue = req.query; // Example: filterValue could include fields like EventID or UserID
            const tickets = await ticketService.getFilterTickets(filterValue);
            res.status(200).json(tickets);
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }

    async sendTicketByEmail(req: Request, res: Response): Promise<void> {
        try {
            const { ticketId, email } = req.body;

            if (!ticketId || !email) {
                res.status(400).json({ message: 'Ticket ID and email are required' });
                return
            }

            const result = await sendTicketToEmail.sendTicketToEmail(ticketId, email);
            res.status(200).json({ message: result });

        } catch (err:any) {
            console.error('Email Send Error:', err.message);
            res.status(500).json({ message: 'Failed to send ticket email' });
        }
    }
}
