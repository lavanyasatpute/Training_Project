import { userRepo } from "../repository/user.repository";
import { User } from "../entities/User";
import { classToPlain } from "class-transformer";
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
    async DeleteUser(id: number): Promise<string> {
        try {
            const result = await this.userRepository.DeleteUser(id);
            return result;
        } catch (error: any) {
            throw new Error(`Failed to delete user with ID ${id}: ${error.message}`);
        }
    }

    // Update a user's information
    async UpdateUser(id: number, updatedData: Partial<User>): Promise<string> {
        try {
            const result = await this.userRepository.UpdateUser(id, updatedData);
            return result;
        } catch (error: any) {
            throw new Error(`Failed to update user with ID ${id}: ${error.message}`);
        }
    }

    // Retrieve all users
    async getAllUsers(): Promise<User[]> {
        try {
            const users = await this.userRepository.getAllUsers();
            return classToPlain(users) as User[];
        } catch (error: any) {
            throw new Error(`Failed to retrieve users: ${error.message}`);
        }
    }

    // Filter users by specific criteria
    async getFilterUser(filterValue: number): Promise<User[]> {
        try {

            const users = await this.userRepository.getFilterUser(filterValue);
            return  classToPlain(users) as User[];
        } catch (error: any) {
            throw new Error(`Failed to filter users: ${error.message}`);
        }
    }
}
