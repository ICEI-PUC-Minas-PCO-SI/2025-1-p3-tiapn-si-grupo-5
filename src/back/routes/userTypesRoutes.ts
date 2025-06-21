import { Router } from "express";
import { UserTypeController } from "../controllers/UserTypeController";
import { autenticarToken } from "../middlewares/auth-jwt";

export class UserTypeRoutes {
    private router: Router;
    private userTypeController: UserTypeController;

    constructor() {
        this.router = Router();
        this.userTypeController = new UserTypeController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/",
            autenticarToken, 
            this.userTypeController.getUserTypes.bind(this.userTypeController));
    }

    public getRouter(): Router {
        return this.router;
    }
}