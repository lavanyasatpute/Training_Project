import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import * as StatusCodes from 'http-status-codes'

const userService = new UserService();

export class UserController {
    // Add a new user
    async addUser(req: Request, res: Response): Promise<void> {
        try {
            const userData = req.body; // Get user data from the request body
            // console.log(userData);
            const result = await userService.AddUser(userData); // Call the service
            res.status(StatusCodes.OK).json(result); // Respond with a success message
        } catch (error:any) {
            res.status(StatusCodes.BAD_REQUEST).json(error.message); // Handle errors
        }
    }

    // Delete a user by ID
    /**
     * This method is used to delete the user 
     * @param req 
     * @param res 
     */
    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const userId : number = parseInt(req.params.id, 10); // Extract user ID from the request parameters
            const result : string  = await userService.DeleteUser(userId); // Call the service
            res.status(200).json(result); // Respond with a success message
        } catch (error:any) {
            res.status(500).json(error.message); // Handle errors
        }
    }

    // Update a user's information
    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.id, 10); // Extract user ID from the request parameters
            const updatedData = req.body; // Get updated data from the request body
            const result = await userService.UpdateUser(userId, updatedData); // Call the service
            res.status(200).json(result); // Respond with a success message
        } catch (error:any) {
            res.status(500).json(error.message); // Handle errors
        }
    }

    // Get all users
    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await userService.getAllUsers(); // Call the service
            res.status(200).json(users); // Respond with the list of users
        } catch (error:any) {
            res.status(500).json({mesaage:error.message}); // Handle errors
        }
    }

    // Filter users by specific criteria
    async getFilteredUsers(req: Request, res: Response): Promise<void> {
        try {
            const filterValue = req.query; // Extract filter criteria from the query parameters
            const users = await userService.getFilterUser(filterValue); // Call the service
            res.status(200).json(users); // Respond with the filtered list of users
        } catch (error:any) {
            res.status(500).json(error.message); // Handle errors
        }
    }
}
