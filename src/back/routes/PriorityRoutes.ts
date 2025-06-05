import { Router } from "express";
import { PriorityController } from "../controllers/PriorityController";

export class PriorityRoutes {
    private router: Router;
    private priorityController: PriorityController;

    constructor() {
        this.router = Router();
        this.priorityController = new PriorityController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/priorities', this.priorityController.getPriorities.bind(this.priorityController));
        this.router.post('/priorities', this.priorityController.createPriority.bind(this.priorityController));
        this.router.put('/priorities/:id', this.priorityController.updatePriority.bind(this.priorityController));
        this.router.delete('/priorities/:id', this.priorityController.deletePriority.bind(this.priorityController));
    }

    public getRouter(): Router {
        return this.router;
    }
}
