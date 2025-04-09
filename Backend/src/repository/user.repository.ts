// import { notContains } from "class-validator";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { classToPlain } from "class-transformer";

export class userRepo {
    private appDataSource = AppDataSource.getRepository(User);
    
    // Add a new user
    async AddUser(UserData: Partial<User>) {
        // console.log("From user repo",UserData);
        
        const user = this.appDataSource.create(UserData);
        await this.appDataSource.save(user);
        return `${user.Name} has been added successfully.`;
    }

    // Delete a user by ID
    async DeleteUser(id: string) {
        const userName = await this.appDataSource.findOne({ where: { UserID: id } });
        if (!userName) throw new Error(`User with ID ${id} not found.`);
        await this.appDataSource.update(id,{status:'deactive'});
        return `${userName.Name} has been deleted successfully.`;
    }

    // Update a user's information
    async UpdateUser(id: string, updatedData: Partial<User>) {
        const userName = await this.appDataSource.findOne({ where: { UserID: id } });
        if (!userName) throw new Error(`User with ID ${id} not found.`);
        const updatedUserData = await this.appDataSource.update(id, updatedData);
        return updatedUserData;
    }

    // Retrieve all users
    async getAllUsers() {
        const user = await this.appDataSource.find({where:{role:'user'}})
        return classToPlain(user);
    }

    // Filter users by specific criteria
    async getFilterUser(filterValue: string) {
        const filterData = await this.appDataSource.find({ where: {UserID:filterValue,status:'active'} });
        return filterData;
    }
}
