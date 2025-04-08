import { TicketController } from "../controllers/ticket.controller";
import { Router } from "express";
const authMiddleware = require('../middleeware/auth.middleware')

const router = Router();
const ticketController = new TicketController();

// Ticket Routes
router.post("/tickets/:userId",ticketController.addTicket);
router.delete("/tickets/:id", ticketController.deleteTicket);
router.put("/tickets/:id", ticketController.updateTicket);
router.get("/my-tickets/:userId", ticketController.getUserTickets);
router.get("/tickets/filter", ticketController.getFilteredTickets);
router.post('/email', authMiddleware, ticketController.sendTicketByEmail);

export default router;
