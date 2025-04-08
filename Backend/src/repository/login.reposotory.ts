import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

export class loginRepo {
    private appDataSource = AppDataSource.getRepository(User);

    // Add a new user
    async getUsernamePass(userName: string) {
        const user = await this.appDataSource.findOne({ where: { Username: userName, status: 'active' } });
        // if(!user) return "User is not valid please register first....."
        return { userid: user?.UserID, name: user?.Name, userName: user?.Username, passWord: user?.Password, role: user?.role, location: user?.location };
    }

    // async getUserPass(userName:string){
    //     const user = await this.appDataSource.findOne({where:{Username:userName}});
    //     return user?.Password
    // }

}