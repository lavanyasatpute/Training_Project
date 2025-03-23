import { loginRepo } from "../repository/login.reposotory"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export class loginService {

    private LoginRepo = new loginRepo()

    async loginUser(username: string, inputpassword: string) {
        const { userid ,name, userName, passWord,role } = await this.LoginRepo.getUsernamePass(username);
        if (!userName) return "Please add valid username";
        if (passWord) {
            const isMatch = bcrypt.compareSync(inputpassword, passWord)
            if (!isMatch) return "Please enter a valid password..."
        }
        const secret = process.env.JWT_SECRET || 'lavanya';
        const token = jwt.sign(
            { id: userid, username: name, role: role },secret,
            { expiresIn: "1h" }
        );

        return {Token:token,messages:`${name} login successfully...`}
    }
}