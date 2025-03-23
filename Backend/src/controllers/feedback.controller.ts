import { Request, Response } from "express";
import { FeedbackService } from "../services/feedback.service";

export class FeedbackController {
    private feedbackService = new FeedbackService();

    async addFeedback(req: Request, res: Response): Promise<void> {
        try {
            const feedbackData = req.body;
            const result = await this.feedbackService.AddFeedback(feedbackData);
            res.status(201).send(result);
        } catch (error:any) {
            res.status(500).send(error.message);
        }
    }

    async deleteFeedback(req: Request, res: Response): Promise<void> {
        try {
            const feedbackID = parseInt(req.params.id, 10);
            const result = await this.feedbackService.DeleteFeedback(feedbackID);
            res.status(200).send(result);
        } catch (error:any) {
            res.status(500).send(error.message);
        }
    }

    async updateFeedback(req: Request, res: Response): Promise<void> {
        try {
            const feedbackID = parseInt(req.params.id, 10);
            const updatedData = req.body;
            const result = await this.feedbackService.UpdateFeedback(feedbackID, updatedData);
            res.status(200).send(result);
        } catch (error:any) {
            res.status(500).send(error.message);
        }
    }

    async getAllFeedback(req: Request, res: Response): Promise<void> {
        try {
            const feedbacks = await this.feedbackService.getAllFeedback();
            res.status(200).json(feedbacks);
        } catch (error:any) {
            res.status(500).send(error.message);
        }
    }

    async getFilteredFeedback(req: Request, res: Response): Promise<void> {
        try {
            const filterValue = req.query; // Example: filterValue could include fields like EventID or UserID
            const feedbacks = await this.feedbackService.getFilterFeedback(filterValue);
            res.status(200).json(feedbacks);
        } catch (error:any) {
            res.status(500).send(error.message);
        }
    }
}
