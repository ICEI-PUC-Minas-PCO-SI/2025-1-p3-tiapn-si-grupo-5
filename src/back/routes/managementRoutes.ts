import { Router } from "express";
import { ManagementController } from "../controllers/ManagementController";
import { validatePayload } from "../middlewares/validate-payload";
import { z } from "zod";
import { autenticarToken } from "../middlewares/auth-jwt";

// Schemas para validação
const managementCreateSchema = z.object({
    nomeGerencia: z.string().min(3)
});
const managementUpdateSchema = z.object({
    idGerencia: z.union([z.number(), z.string()]),
    nomeGerencia: z.string().min(3)
});

export class ManagementRoutes {
    private router: Router;
    private managementController: ManagementController;

    constructor() {
        this.router = Router();
        this.managementController = new ManagementController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(
            "/departments",
            this.managementController.getAllActiveManagement.bind(this.managementController)
        );
        this.router.post(
            "/departments",
            autenticarToken, 
            validatePayload(managementCreateSchema),
            this.managementController.createManagement.bind(this.managementController)
        );
        this.router.put(
            "/departments/:id",
            autenticarToken, 
            validatePayload(managementUpdateSchema),
            this.managementController.updateManagement.bind(this.managementController)
        );
        this.router.delete(
            "/departments/:id",
            autenticarToken, 
            this.managementController.deleteManagement.bind(this.managementController)
        );
    }

    public getRouter(): Router {
        return this.router;
    }
}