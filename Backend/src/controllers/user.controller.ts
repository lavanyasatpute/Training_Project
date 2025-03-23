import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
    private userService = new UserService();

    // Add a new user
    async addUser(req: Request, res: Response): Promise<void> {
        try {
            const userData = req.body; // Get user data from the request body
            const result = await this.userService.AddUser(userData); // Call the service
            res.status(201).send(result); // Respond with a success message
        } catch (error:any) {
            res.status(500).send(error.message); // Handle errors
        }
    }

    // Delete a user by ID
    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.id, 10); // Extract user ID from the request parameters
            const result = await this.userService.DeleteUser(userId); // Call the service
            res.status(200).send(result); // Respond with a success message
        } catch (error:any) {
            res.status(500).send(error.message); // Handle errors
        }
    }

    // Update a user's information
    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.id, 10); // Extract user ID from the request parameters
            const updatedData = req.body; // Get updated data from the request body
            const result = await this.userService.UpdateUser(userId, updatedData); // Call the service
            res.status(200).send(result); // Respond with a success message
        } catch (error:any) {
            res.status(500).send(error.message); // Handle errors
        }
    }

    // Get all users
    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.getAllUsers(); // Call the service
            res.status(200).json(users); // Respond with the list of users
        } catch (error:any) {
            res.status(500).send(error.message); // Handle errors
        }
    }

    // Filter users by specific criteria
    async getFilteredUsers(req: Request, res: Response): Promise<void> {
        try {
            const filterValue = req.query; // Extract filter criteria from the query parameters
            const users = await this.userService.getFilterUser(filterValue); // Call the service
            res.status(200).json(users); // Respond with the filtered list of users
        } catch (error:any) {
            res.status(500).send(error.message); // Handle errors
        }
    }
}
