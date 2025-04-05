import { Router } from "express";
import { EventUserController } from "../controllers/eventUser.controller";
const authMiddleware = require('../middleeware/auth.middleware');

const router = Router();
const eventUserController = new EventUserController();

// Event Routes
router.post("/add", authMiddleware,eventUserController.addEventUser);
router.delete("/delete/:user_id/:event_id",authMiddleware, eventUserController.deleteEventUser);
// router.put("/update/:id", eventController.updateEvent);
// router.get("/getall" , eventController.getAllEvents);
router.get("/filter/:userId",authMiddleware, eventUserController.getFilteredEventUser);

export default router;
