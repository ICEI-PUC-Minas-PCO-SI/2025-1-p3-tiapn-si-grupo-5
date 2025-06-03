import { Router } from 'express';
import { StatusController } from '../controllers/StatusController';

export class StatusRoutes {
    private router: Router;
    private statusController: StatusController;

    constructor() {
        this.router = Router();
        this.statusController = new StatusController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/status', this.statusController.getStatus.bind(this.statusController));
        this.router.post('/status', this.statusController.createStatus.bind(this.statusController));
        this.router.put('/status', this.statusController.updateStatus.bind(this.statusController));
        this.router.delete('/status', this.statusController.deleteStatus.bind(this.statusController));
    }

    public getRouter(): Router {
        return this.router;
    }
}

