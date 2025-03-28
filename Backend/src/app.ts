import express, { Request,Response,NextFunction } from "express";
import userRoutes from "./routes/user.route";
import feedbackRoutes from "./routes/feedback.route";
import ticketRoutes from "./routes/ticket.route";
import eventRoutes from "./routes/enevt.route";
import { AppDataSource } from "./config/data-source";
import cors from 'cors'
const app = express();
app.use(cors())
// Middleware to parse JSON requests
app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully!");
    })
    .catch((error) => {
        console.error("Error connecting to the database", error);
    });


// Set up routes
app.use("/api/users", userRoutes); // Routes for user management
app.use("/api/feedback", feedbackRoutes); // Routes for feedback management
app.use("/api/tickets", ticketRoutes); // Routes for ticket management
app.use("/api/events", eventRoutes); // Routes for event management

// Root endpoint
app.get("/", (req, res) => {
    res.send("Welcome to the Event Management API!");
});

// Error handling middleware
app.use((err:any, _req:Request, res:Response,next:NextFunction) => {
    console.error(err.stack); // Log the error
    res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
