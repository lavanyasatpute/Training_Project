import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

// Define routes for user operations
router.post("/users", (req, res) => userController.addUser(req, res)); // Route to add a new user
router.delete("/users/:id", (req, res) => userController.deleteUser(req, res)); // Route to delete a user by ID
router.put("/users/:id", (req, res) => userController.updateUser(req, res)); // Route to update user details by ID
router.get("/users", (req, res) => userController.getAllUsers(req, res)); // Route to get all users
router.get("/users/filter", (req, res) => userController.getFilteredUsers(req, res)); // Route to filter users by specific criteria

export default router;
