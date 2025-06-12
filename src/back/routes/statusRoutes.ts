import { Router } from 'express';
import { StatusController } from '../controllers/statusController';
import { validatePayload } from "../middlewares/validate-payload";
import { z } from "zod";
import { autenticarToken } from "../middlewares/auth-jwt";

// Schemas para validação
const statusCreateSchema = z.object({
    nomeStatus: z.string().min(3),
    color: z.string().min(3)
});
const statusUpdateSchema = z.object({
    idStatus: z.union([z.number(), z.string()]),
    nomeStatus: z.string().min(3),
    color: z.string().min(3)
});

export class StatusRoutes {
    private router: Router;
    private statusController: StatusController;

    constructor() {
        this.router = Router();
        this.statusController = new StatusController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(
            "/statuses",
            autenticarToken,
            this.statusController.getStatus.bind(this.statusController)
        );
        this.router.post(
            "/statuses",
            autenticarToken,
            validatePayload(statusCreateSchema),
            this.statusController.createStatus.bind(this.statusController)
        );
        this.router.put(
            "/statuses/:idStatus",
            autenticarToken,
            validatePayload(statusUpdateSchema),
            this.statusController.updateStatus.bind(this.statusController)
        );
        this.router.delete(
            "/statuses/:idStatus",
            autenticarToken,
            this.statusController.deleteStatus.bind(this.statusController)
        );
    }

    public getRouter(): Router {
        return this.router;
    }
}

