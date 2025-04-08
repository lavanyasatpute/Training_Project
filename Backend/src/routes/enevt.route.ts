import { Router } from "express";
const authMiddleware = require('../middleeware/auth.middleware');
import { EventController } from "../controllers/event.controller";

const router = Router();
const eventController = new EventController();

// Event Routes
router.post("/add", eventController.addEvent);
router.delete("/delete/:id", eventController.deleteEvent);
router.patch("/update/:id", eventController.updateEvent);
router.get("/getall" , eventController.getAllEvents);
router.get("/filter/:id", eventController.getFilteredEvents);
router.get("/created-event/:id",eventController.getFilteredEventCreatedByUser);

export default router;
