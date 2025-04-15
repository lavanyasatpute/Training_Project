import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import * as StatusCodes from 'http-status-codes'
import { UserDTO } from "../DTO/user.dto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { AppError } from "../utils/appError";

const userService = new UserService();

export class UserController {
    // Add a new user
    async addUser(req: Request, res: Response): Promise<void> {
        try {
            // const userData = req.body;
            const userDTO = plainToInstance(UserDTO, req.body);

            // const trimmedEventDTO = mapValues(userDTO, (value) =>
            //     typeof value === "string" ? value.trim() : value
            // );

            // Validate the EventDTO
            // console.log(userDTO);

            const errors = await validate(userDTO);
            if (errors.length > 0) {
                res.status(StatusCodes.OK).json({
                    message: "Validation failed, please provide valid data.",
                    data: errors.map((error: any) => Object.values(error.constraints)),
                });
                return
            }
            // console.log(userData);
            // Transform Username to string
            const transformedUserDTO = { ...userDTO, Username: userDTO.Username.toString() };
            const result = await userService.AddUser(transformedUserDTO); // Call the service
            res.status(StatusCodes.OK).json(result); // Respond with a success message
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json(error.message); // Handle errors
        }
    }

    // Delete a user by ID
    /**
     * @description
     * This method is used to delete the user 
     * @param req 
     * @param res 
     */
    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = (req.params.id); // Extract user ID from the request parameters
            const result: string = await userService.DeleteUser(String(userId)); // Call the service
            res.status(StatusCodes.OK).json(result); // Respond with a success message
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json(error.message); // Handle errors
        }
    }

    // Update a user's information
    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.id; // Extract user ID from the request parameters
            const updatedData = req.body; // Get updated data from the request body
            const result = await userService.UpdateUser(userId, updatedData);
            // console.log(result);
             // Call the service
            res.status(StatusCodes.OK).json(result); // Respond with a success message
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json(error.message); // Handle errors
        }
    }

    // Get all users
    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await userService.getAllUsers(); // Call the service
            res.status(StatusCodes.OK).json(users); // Respond with the list of users
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({ mesaage: error.message }); // Handle errors
        }
    }

    // Filter users by specific criteria
    async getFilteredUsers(req: Request, res: Response,next:NextFunction): Promise<void> {
        try {
            // const filterValue = req.query; // Extract filter criteria from the query parameters
            let id = req.params.id // Allow undefined
            // const parsedFilter: Partial<User> = filterValue ? JSON.parse(filterValue) : {}; // Parse safely

            const users = await userService.getFilterUser(String(id)); // Call the service
            res.status(StatusCodes.OK).json(users); // Respond with the filtered list of users
        } catch (error: any) {
            next(error)
            // res.status(StatusCodes.BAD_REQUEST).json(error.message); // Handle errors
        }
    }

    async asyncErrorController(req:Request,res:Response,next:NextFunction){
        try {
            await Promise.reject(new AppError("Async error occured!",500));
        } catch (error) {
            next(error);
        }
    }
}
