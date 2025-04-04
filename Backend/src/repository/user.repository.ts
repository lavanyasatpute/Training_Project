// import { notContains } from "class-validator";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { classToPlain } from "class-transformer";

export class userRepo {
    private appDataSource = AppDataSource.getRepository(User);
    
    // Add a new user
    async AddUser(UserData: Partial<User>) {
        console.log(UserData);
        
        const user = this.appDataSource.create(UserData);
        await this.appDataSource.save(user);
        return `${user.Name} has been added successfully.`;
    }

    // Delete a user by ID
    async DeleteUser(id: number) {
        const userName = await this.appDataSource.findOne({ where: { UserID: id } });
        if (!userName) throw new Error(`User with ID ${id} not found.`);
        await this.appDataSource.delete(id);
        return `${userName.Name} has been deleted successfully.`;
    }

    // Update a user's information
    async UpdateUser(id: number, updatedData: Partial<User>) {
        const userName = await this.appDataSource.findOne({ where: { UserID: id } });
        if (!userName) throw new Error(`User with ID ${id} not found.`);
        await this.appDataSource.update(id, updatedData);
        return `${userName.Name} has been updated successfully.`;
    }

    // Retrieve all users
    async getAllUsers() {
        const user = await this.appDataSource.find({select:[]})
        return classToPlain(user);
    }

    // Filter users by specific criteria
    async getFilterUser(filterValue: number) {
        const filterData = await this.appDataSource.find({ where: {UserID:filterValue} });
        return filterData;
    }
}
