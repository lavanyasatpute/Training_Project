import { Router } from "express";

import { EventController } from "../controllers/event.controller";

const router = Router();
const eventController = new EventController();

// Event Routes
router.post("/events", eventController.addEvent);
router.delete("/events/:id", eventController.deleteEvent);
router.put("/events/:id", eventController.updateEvent);
router.get("/events", eventController.getAllEvents);
router.get("/events/filter", eventController.getFilteredEvents);

export default router;
