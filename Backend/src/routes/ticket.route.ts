import { TicketController } from "../controllers/ticket.controller";
import { Router } from "express";

const router = Router();
const ticketController = new TicketController();

// Ticket Routes
router.post("/tickets",ticketController.addTicket);
router.delete("/tickets/:id", ticketController.deleteTicket);
router.put("/tickets/:id", ticketController.updateTicket);
router.get("/tickets", ticketController.getAllTickets);
router.get("/tickets/filter", ticketController.getFilteredTickets);

export default router;
