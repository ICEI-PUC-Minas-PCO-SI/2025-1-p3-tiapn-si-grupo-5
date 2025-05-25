import { Router } from "express";
import { UserController } from "../controllers/UserController";

export class UserRoutes {
    private router: Router;
    private userController: UserController;

    constructor() {
        this.router = Router();
        this.userController = new UserController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/register", this.userController.registerUser.bind(this.userController));
        this.router.post("/login", this.userController.loginUser.bind(this.userController));
        this.router.get("/", this.userController.getAllUsers.bind(this.userController));
    }

    public getRouter(): Router {
        return this.router;
    }
}