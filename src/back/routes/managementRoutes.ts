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
        this.router.get("/departments", this.managementController.getAllActiveManagement.bind(this.managementController));
        this.router.post("/departments", this.managementController.createManagement.bind(this.managementController));
        this.router.put("/departments/:id", this.managementController.updateManagement.bind(this.managementController));
        this.router.delete("/departments/:id", this.managementController.deleteManagement.bind(this.managementController));
    }

    public getRouter(): Router {
        return this.router;
    }
}