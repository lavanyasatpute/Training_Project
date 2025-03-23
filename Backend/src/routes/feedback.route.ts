
import { Router } from "express";
import { FeedbackController } from "../controllers/feedback.controller";

const feedbackController = new FeedbackController();

const router = Router();
router.post("/feedback", feedbackController.addFeedback);
router.delete("/feedback/:id", feedbackController.deleteFeedback);
router.put("/feedback/:id", feedbackController.updateFeedback);
router.get("/feedback", feedbackController.getAllFeedback);
router.get("/feedback/filter", feedbackController.getFilteredFeedback);
export default router;
