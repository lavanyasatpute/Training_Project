import { NextFunction,Response } from "express";

function roleMiddleware(requiredRole:string) {
    return (req:any, res:Response, next:NextFunction) => {
        if (!req.user || req.user.role !== requiredRole) {
            return res.status(403).json({ error: "Access denied: Insufficient permissions" });
        }
        next(); // User has the correct role, continue
    };
}

module.exports = roleMiddleware;
