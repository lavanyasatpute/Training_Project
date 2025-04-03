import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";

export const errorMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error("Error: ", err.message);

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: "Error",
            message: err.message
        })
    }

    res.status(500).json({
        status:"error",
        message:"Something went wrong...."
    })

}
