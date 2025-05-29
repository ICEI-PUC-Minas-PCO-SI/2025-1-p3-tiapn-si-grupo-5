import { Router } from "express";
import { ManagementController } from "../controllers/ManagementController";

export class ManagementRoutes {
    private router: Router;
    private managementController: ManagementController;

    constructor() {
        this.router = Router();
        this.managementController = new ManagementController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/active", this.managementController.getAllActiveManagement.bind(this.managementController));
    }

    public getRouter(): Router {
        return this.router;
    }
}