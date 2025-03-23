import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

export class userRepo {
    private appDataSource = AppDataSource.getRepository(User);

    // Add a new user
    async AddUser(UserData: Partial<User>) {
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
        return await this.appDataSource.find();
    }

    // Filter users by specific criteria
    async getFilterUser(filterValue: Partial<User>) {
        const filterData = await this.appDataSource.find({ where: filterValue });
        return filterData;
    }
}
