import express, { Request, Response, NextFunction } from "express";
import userRoutes from "./routes/user.route";
import feedbackRoutes from "./routes/feedback.route";
import ticketRoutes from "./routes/ticket.route";
import eventRoutes from "./routes/enevt.route";
import eventuserRoutes from './routes/eventUser.route'
import { AppDataSource } from "./config/data-source";
import { UserController } from "./controllers/user.controller";
import { errorMiddleware } from "./middleeware/error.middleware";
import cors from 'cors'
import dotenv from 'dotenv';
import cookiesParser from 'cookie-parser';
dotenv.config();

const userController = new UserController();
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true // it is used to allow the tokens or header data in a request so thats why we are used for that.
}))
// Middleware to parse JSON requests
app.use(express.json({
    limit: '16kb'
}));

app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}));

app.use(express.static("public"));

app.use(cookiesParser())

// Error handling middleware should be placed after all routes
app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    errorMiddleware(err, _req, res, next)
});

AppDataSource.initialize()
    .then(() => {
        // console.log(AppDataSource);
        const PORT = process.env.SERVER_PORT;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

        console.log("Database connected successfully!");
    })
    .catch((error) => {
        console.error("Error connecting to the database", error);
    });


// Set up routes 
app.get('/async-error', userController.asyncErrorController)
app.use("/api/users", userRoutes); // Routes for user management
app.use("/api/feedback", feedbackRoutes); // Routes for feedback management
app.use("/api/tickets", ticketRoutes); // Routes for ticket management
app.use("/api/events", eventRoutes); // Routes for event management
app.use("/api/eventuser", eventuserRoutes) //Routes for ralation between user and event

// Root endpoint
app.get("/", (req, res) => {
    res.send("Welcome to the Event Management API!");
});



// Start the server
