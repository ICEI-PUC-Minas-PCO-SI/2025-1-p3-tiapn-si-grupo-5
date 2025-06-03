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
        this.router.get("/department", this.managementController.getAllActiveManagement.bind(this.managementController));
        this.router.post('/department', this.managementController.createManagement.bind(this.managementController));
        this.router.put('/department', this.managementController.updateManagement.bind(this.managementController));
        this.router.delete('/department', this.managementController.deleteManagement.bind(this.managementController));
    }

    public getRouter(): Router {
        return this.router;
    }
}