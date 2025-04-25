import { userRepo } from "../repository/user.repository";
import { User } from "../entities/User";
import { classToPlain } from "class-transformer";
import { AppError } from "../utils/appError";
const bcrypt = require('bcrypt');

export class UserService {
    private userRepository = new userRepo();

    // Add a new user
    async AddUser(UserData: Partial<User>): Promise<string> {
        try {
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(UserData.Password, salt);
            UserData.Password = hash;
            // console.log(UserData);
            const result = await this.userRepository.AddUser(UserData);
            return result;
        } catch (error: any) {
            throw new Error(`Failed to add user: ${error.message}`);
        }
    }

    // Delete a user by ID
    async DeleteUser(id: string): Promise<string| any> {
        try {
            const result = await this.userRepository.DeleteUser(id);
            return result;
        } catch (error: any) {
            throw new AppError(`Failed to delete user with ID ${id}: ${error.message}`,400);
        }
    }

    // Update a user's information
    async UpdateUser(id: string, updatedData: Partial<User>){
        try {
            if (updatedData.Password) {
                const saltRounds = 10;
                const salt = bcrypt.genSaltSync(saltRounds);
                const hash = bcrypt.hashSync(updatedData.Password, salt);
                updatedData.Password = hash;
            }
            const result = await this.userRepository.UpdateUser(id, updatedData);
            return result;
        } catch (error: any) {
            throw new AppError(`Failed to update user with ID ${id}: ${error.message}`,400);
        }
    }

    // Retrieve all users
    async getAllUsers(): Promise<User[]> {
        try {
            const users = await this.userRepository.getAllUsers();
            return classToPlain(users) as User[];
        } catch (error: any) {
            throw new AppError(`Failed to retrive users: ${error.message}`,400);
        }
    }

    // Filter users by specific criteria
    async getFilterUser(filterValue: string): Promise<User[] | any> {
        try {

            const users = await this.userRepository.getFilterUser(filterValue);
            return classToPlain(users) as User[];
        } catch (error: any) {
            return new AppError(`Failed to filter users: ${error.message}`,400);
        }
    }
}
