import { loginRepo } from "../repository/login.reposotory"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export class loginService {

    private LoginRepo = new loginRepo()

    async loginUser(username: string, inputpassword: string) {
        const { userid ,name, userName, passWord,role } = await this.LoginRepo.getUsernamePass(username);
        if (!userName) return {Token:"",messages:"",name:'',role:''};
        if (passWord) {
            const isMatch = bcrypt.compareSync(inputpassword, passWord)
            if (!isMatch) return {Token:"",messages:"",name:'',role:''}
        }
        const secret_key = process.env.JWT_SECRET || 'lavanya';
        const token = jwt.sign(
            { id: userid, username: name, role: role },secret_key,
            { expiresIn: "1d" }
        );

        return {Token:token,messages:`${name} login successfully...!`,name:username,role:role,id: userid}
    }
}