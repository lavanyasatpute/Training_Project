import { NextFunction,Request,Response } from "express";

const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

// Middleware function
function authMiddleware(req:any, res:Response, next:NextFunction) {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    try {
        // Verify token
        const secret = process.env.JWT_SECRET || "lavanya";
        const decoded = jwt.verify(token, secret);
        req.user = decoded; // Attach decoded user info to request
        next(); // Proceed to next middleware or route
    } catch (err) {
        return res.status(403).json({ error: "Forbidden: Invalid token" });
    }
}

module.exports = authMiddleware;
