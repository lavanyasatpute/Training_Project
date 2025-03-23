import { Request, Response } from "express";
import { loginService } from "../services/login.service";
const LoginService = new loginService();

export class LoginController {

    async LoginUser(req: Request, res: Response): Promise<void> {
        try {
            const {username,password} = req.body;
            const result = await LoginService.loginUser(username,password);
            res.status(201).send(result);
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }
}