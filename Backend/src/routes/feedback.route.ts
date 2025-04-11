
import { Router } from "express";
import { FeedbackController } from "../controllers/feedback.controller";

const feedbackController = new FeedbackController();

const router = Router();
router.post("/add", feedbackController.addFeedback);
router.delete("/delete/:id", feedbackController.deleteFeedback);
router.put("/update/:id", feedbackController.updateFeedback);
router.get("/getall", feedbackController.getAllFeedback);
router.get("/getfilter/:id", feedbackController.getFilteredFeedback);
export default router;
