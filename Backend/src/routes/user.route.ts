import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { LoginController } from "../controllers/login.controller";
const authMiddleware = require('../middleeware/auth.middleware');
const roleMiddleware = require('../middleeware/roleAuth.middleware');

const router = Router();
const userController = new UserController();
const loginController = new LoginController()

// Define routes for user operations
router.post("/add", userController.addUser); // Route to add a new user
router.delete("/delete/:id",authMiddleware, userController.deleteUser); // Route to delete a user by ID
router.put("/update/:id",authMiddleware, userController.updateUser); // Route to update user details by ID
router.get("/alluser",authMiddleware,roleMiddleware("admin"), userController.getAllUsers); //roleMiddleware("admin")... // Route to get all users
router.get("/filter/:id" ,authMiddleware, userController.getFilteredUsers); // Route to filter users by specific criteria
router.post('/login',loginController.LoginUser)


export default router;
