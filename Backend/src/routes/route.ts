import { Router } from "express";
import { FeedbackController } from "../controllers/feedback.controller";
import { TicketController } from "../controllers/ticket.controller";
import { EventController } from "../controllers/event.controller";

const router = Router();
const feedbackController = new FeedbackController();
const ticketController = new TicketController();
const eventController = new EventController();

// Feedback Routes
router.post("/feedback", (req, res) => feedbackController.addFeedback(req, res));
router.delete("/feedback/:id", (req, res) => feedbackController.deleteFeedback(req, res));
router.put("/feedback/:id", (req, res) => feedbackController.updateFeedback(req, res));
router.get("/feedback", (req, res) => feedbackController.getAllFeedback(req, res));
router.get("/feedback/filter", (req, res) => feedbackController.getFilteredFeedback(req, res));

// Ticket Routes
router.post("/tickets", (req, res) => ticketController.addTicket(req, res));
router.delete("/tickets/:id", (req, res) => ticketController.deleteTicket(req, res));
router.put("/tickets/:id", (req, res) => ticketController.updateTicket(req, res));
router.get("/tickets", (req, res) => ticketController.getAllTickets(req, res));
router.get("/tickets/filter", (req, res) => ticketController.getFilteredTickets(req, res));

// Event Routes
router.post("/events", (req, res) => eventController.addEvent(req, res));
router.delete("/events/:id", (req, res) => eventController.deleteEvent(req, res));
router.put("/events/:id", (req, res) => eventController.updateEvent(req, res));
router.get("/events", (req, res) => eventController.getAllEvents(req, res));
router.get("/events/filter", (req, res) => eventController.getFilteredEvents(req, res));

export default router;
