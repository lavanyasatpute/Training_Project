import { Router } from "express";

import { EventController } from "../controllers/event.controller";

const router = Router();
const eventController = new EventController();

// Event Routes
router.post("/add", eventController.addEvent);
router.delete("/delete/:id", eventController.deleteEvent);
router.put("/update/:id", eventController.updateEvent);
router.get("/getall", eventController.getAllEvents);
router.get("/filter", eventController.getFilteredEvents);

export default router;
