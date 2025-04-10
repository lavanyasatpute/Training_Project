import { feedbackRepo } from "../repository/feedback.repository";
import { Feedback } from "../entities/Feedback";

export class FeedbackService {
    private feedbackRepository = new feedbackRepo();

    // Add Feedback
    async AddFeedback(feedbackData: Partial<Feedback>): Promise<string> {
        try {
            const result = await this.feedbackRepository.AddFeedback(feedbackData);
            return result;
        } catch (error:any) {
            throw new Error(`Failed to add feedback: ${error.message}`);
        }
    }

    // Delete Feedback
    async DeleteFeedback(feedbackID: number): Promise<string> {
        try {
            const result = await this.feedbackRepository.DeleteFeedback(feedbackID);
            return result;
        } catch (error:any) {
            throw new Error(`Failed to delete feedback with ID ${feedbackID}: ${error.message}`);
        }
    }
    
    // Update Feedback
    async UpdateFeedback(feedbackID: number, updatedData: Partial<Feedback>): Promise<string> {
        try {
            const result = await this.feedbackRepository.UpdateFeedback(feedbackID, updatedData);
            return result;
        } catch (error:any) {
            throw new Error(`Failed to update feedback with ID ${feedbackID}: ${error.message}`);
        }
    }

    // Get All Feedback
    async getAllFeedback(): Promise<Feedback[]> {
        try {
            const feedbacks = await this.feedbackRepository.getAllFeedback();
            return feedbacks;
        } catch (error:any) {
            throw new Error(`Failed to retrieve feedback: ${error.message}`);
        }
    }

    // Filter Feedback
    async getFilterFeedback(id: string): Promise<Feedback[]> {
        try {
            const feedbacks = await this.feedbackRepository.getFilterFeedback(id);
            return feedbacks;
        } catch (error:any) {
            throw new Error(`Failed to filter feedback: ${error.message}`);
        }
    }
}
