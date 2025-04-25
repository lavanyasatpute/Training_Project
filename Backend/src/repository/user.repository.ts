// import { notContains } from "class-validator";
import { AppDataSource } from "../config/data-source";
import { Status } from "../constant/status";
import { User } from "../entities/User";
import { classToPlain } from "class-transformer";
import { AppError } from "../utils/appError";

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
        const result = await this.appDataSource.update(id, { status: Status.INACTIVE });
        if(result.affected === 0){
            return new AppError("User is not delete or not found the user",400);
        }
        return `${userName.Name} has been deleted successfully.`;
    }

    // Update a user's information
    async UpdateUser(id: string, updatedData: Partial<User>) {
        const userName = await this.appDataSource.findOne({ where: { UserID: id } });
        if (!userName) throw new Error(`User with ID ${id} not found.`);
        const updatedUserData = await this.appDataSource.update(id, updatedData);
        if (updatedUserData.affected === 0) {
            return new AppError("The update was not found", 400);
        }
        return updatedUserData;
    }

    // Retrieve all users
    async getAllUsers() {
        const user = await this.appDataSource.find({ where: { role: 'user',status: Status.ACTIVE } })
        return classToPlain(user);
    }

    // Filter users by specific criteria
    async getFilterUser(userId: string) {
        const filterData = await this.appDataSource.find({ where: { UserID: userId, status: Status.ACTIVE } });
        return filterData;
    }
}
