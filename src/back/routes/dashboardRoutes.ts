import { Router } from "express";
import { DashboardController } from "../controllers/dashboardController";

export class DashboardRoutes {
    private router: Router;
    private dashboardController: DashboardController;

    constructor() {
        this.router = Router();
        this.dashboardController = new DashboardController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
/*         
    -- NÃO MAIS UTILIZADO, MAS MANTIDO PARA REFERÊNCIA --

        this.router.get("/dashboard/tickets-by-type", this.dashboardController.getTicketsByType.bind(this.dashboardController));
        this.router.get("/dashboard/tickets-by-status", this.dashboardController.getTicketsByStatus.bind(this.dashboardController));
        this.router.get("/dashboard/tickets-by-priority", this.dashboardController.getTicketsByPriority.bind(this.dashboardController));
         */
        this.router.get("/dashboard/tickets-by-analyst", this.dashboardController.getTicketsByAnalyst.bind(this.dashboardController));
        this.router.get("/dashboard/summary", this.dashboardController.getDashboardSummary.bind(this.dashboardController));
    }

    public getRouter(): Router {
        return this.router;
    }
}
