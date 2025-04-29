import { Router } from "express";
const authMiddleware = require('../middleeware/auth.middleware');
const roleMiddleware = require('../middleeware/roleAuth.middleware');
import { EventController } from "../controllers/event.controller";

const router = Router();
const eventController = new EventController();

// Event Routes
router.post("/add", authMiddleware, eventController.addEvent);
router.delete("/delete/:id", authMiddleware, eventController.deleteEvent);
router.put("/update/:id", authMiddleware, eventController.updateEvent);
router.get("/getall", eventController.getAllEvents);
router.get("/filter/:id", authMiddleware, eventController.getFilteredEvents);
router.get("/created-event/:id", authMiddleware, eventController.getFilteredEventCreatedByUser);
router.get("/aprrove/:eventID/:aprroveValue",authMiddleware,roleMiddleware('admin'), eventController.aprroveEventFromController)
router.get('/getforaprroved',authMiddleware,roleMiddleware('admin'),eventController.getAllEventForAdmin);

export default router;
