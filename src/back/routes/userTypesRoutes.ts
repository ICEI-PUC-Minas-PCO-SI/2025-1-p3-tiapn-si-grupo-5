import { Router } from "express";
import { UserTypeController } from "../controllers/UserTypeController";

export class UserTypeRoutes {
    private router: Router;
    private userTypeController: UserTypeController;

    constructor() {
        this.router = Router();
        this.userTypeController = new UserTypeController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/", this.userTypeController.getAllUserTypes.bind(this.userTypeController));
    }

    public getRouter(): Router {
        return this.router;
    }
}