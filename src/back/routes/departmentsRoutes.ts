import { Router } from "express";
import { DepartmentsController } from "../controllers/DepartmentsController";
import { validatePayload } from "../middlewares/validate-payload";
import { z } from "zod";
import { autenticarToken } from "../middlewares/auth-jwt";

// Schemas para validação
const DepartmentsCreateSchema = z.object({
    nomeGerencia: z.string().min(3)
});
const DepartmentsUpdateSchema = z.object({
    idGerencia: z.union([z.number(), z.string()]),
    nomeGerencia: z.string().min(3)
});

export class DepartmentsRoutes {
    private router: Router;
    private DepartmentsController: DepartmentsController;

    constructor() {
        this.router = Router();
        this.DepartmentsController = new DepartmentsController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(
            "/public",
            this.DepartmentsController.getAllActiveDepartments.bind(this.DepartmentsController)
        );
        this.router.get(
            "/",
            autenticarToken,
            this.DepartmentsController.getAllActiveDepartments.bind(this.DepartmentsController)
        );
        this.router.post(
            "/",
            autenticarToken,
            validatePayload(DepartmentsCreateSchema),
            this.DepartmentsController.createDepartments.bind(this.DepartmentsController)
        );
        this.router.put(
            "/:id",
            autenticarToken,
            validatePayload(DepartmentsUpdateSchema),
            this.DepartmentsController.updateDepartments.bind(this.DepartmentsController)
        );
        this.router.delete(
            "/:id",
            autenticarToken,
            this.DepartmentsController.deleteDepartments.bind(this.DepartmentsController)
        );
    }

    public getRouter(): Router {
        return this.router;
    }
}
