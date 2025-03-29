import { Request, Response } from "express";
import { loginService } from "../services/login.service";
import * as StatusCodes from 'http-status-codes'

const LoginService = new loginService();

export class LoginController {

    async LoginUser(req: Request, res: Response): Promise<void> {
        try {
            const {username,password} = req.body;
            const result = await LoginService.loginUser(username,password);
            res.status(StatusCodes.OK).json(result);
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json(error.message);
        }
    }
}