import { Router } from "express";
import { UserController } from "../controllers/user.controller";
const authMiddleware = require('../middleeware/auth.middleware');
const roleMiddleware = require('../middleeware/roleAuth.middleware');

const router = Router();
const userController = new UserController();

// Define routes for user operations
router.post("/users", userController.addUser); // Route to add a new user
router.delete("/users/:id", userController.deleteUser); // Route to delete a user by ID
router.put("/users/:id", userController.updateUser); // Route to update user details by ID
router.get("/users",authMiddleware,roleMiddleware("admin"), userController.getAllUsers); // Route to get all users
router.get("/users/filter", userController.getFilteredUsers); // Route to filter users by specific criteria

export default router;
