import { AppDataSource } from "../config/data-source";
import { Feedback } from "../entities/Feedback";
import { AppError } from "../utils/appError";

export class feedbackRepo {
    private appDataSource = AppDataSource.getRepository(Feedback);

    // Add Feedback
    async AddFeedback(feedbackData: Partial<Feedback>) {
        const feedback = this.appDataSource.create(feedbackData);
        await this.appDataSource.save(feedback);
        return `Feedback added successfully for Event ID: ${feedback.FeedbackID}`;
    }

    // Delete Feedback by ID
    async DeleteFeedback(feedbackID: number) {
        const feedback = await this.appDataSource.findOne({ where: { FeedbackID: feedbackID } });
        if (!feedback) throw new Error(`Feedback with ID ${feedbackID} not found.`);
        await this.appDataSource.delete(feedbackID);
        return `Feedback with ID ${feedbackID} has been deleted successfully.`;
    }

    // Update Feedback
    async UpdateFeedback(feedbackID: number, updatedData: Partial<Feedback>) {
        const feedback = await this.appDataSource.findOne({ where: { FeedbackID: feedbackID } });
        if (!feedback) throw new Error(`Feedback with ID ${feedbackID} not found.`);
        const resulte = await this.appDataSource.update(feedbackID, updatedData);
        if (resulte.affected === 0) {
            throw new AppError("The update was not found", 400);
        }
        return `Feedback with ID ${feedbackID} has been updated successfully.`;
    }

    // Get All Feedback
    async getAllFeedback() {
        return await this.appDataSource.find();
    }

    // Filter Feedback by Specific Criteria
    async getFilterFeedback(id: string) {
        return await this.appDataSource.find({ where: { User: { UserID: id } } });
    }
}
