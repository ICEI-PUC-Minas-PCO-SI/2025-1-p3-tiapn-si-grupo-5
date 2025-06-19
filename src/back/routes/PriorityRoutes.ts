import { Router } from "express";
import { PriorityController } from "../controllers/priorityController";
import { validatePayload } from "../middlewares/validate-payload";
import { z } from "zod";
import { autenticarToken } from "../middlewares/auth-jwt";
// Schemas para validação
const priorityCreateSchema = z.object({
    nomePrioridade: z.string().min(3),
    hexCorPrimaria: z.string().min(3),
    hexCorSecundaria: z.string().min(3)
});
const priorityUpdateSchema = z.object({
    idPrioridade: z.union([z.number(), z.string()]),
    nomePrioridade: z.string().min(3),
    hexCorPrimaria: z.string().min(3),
    hexCorSecundaria: z.string().min(3)
});

export class PriorityRoutes {
    private router: Router;
    private priorityController: PriorityController;

    constructor() {
        this.router = Router();
        this.priorityController = new PriorityController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(
            '/priorities',
            this.priorityController.getPriorities.bind(this.priorityController)
        );
        this.router.post(
            '/priorities',
            validatePayload(priorityCreateSchema),
            autenticarToken,
            this.priorityController.createPriority.bind(this.priorityController)
        );
        this.router.put(
            '/priorities/:id',
            validatePayload(priorityUpdateSchema),
            autenticarToken,
            this.priorityController.updatePriority.bind(this.priorityController)
        );
        this.router.delete(
            '/priorities/:id',
            autenticarToken,
            this.priorityController.deletePriority.bind(this.priorityController)
        );
    }

    public getRouter(): Router {
        return this.router;
    }
}
