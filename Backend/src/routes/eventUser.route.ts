import { Router } from "express";
import { EventUserController } from "../controllers/eventUser.controller";

const router = Router();
const eventUserController = new EventUserController();

// Event Routes
router.post("/add", eventUserController.addEventUser);
router.delete("/delete/:user_id/:event_id", eventUserController.deleteEventUser);
// router.put("/update/:id", eventController.updateEvent);
// router.get("/getall" , eventController.getAllEvents);
router.get("/filter/:userId", eventUserController.getFilteredEventUser);

export default router;
