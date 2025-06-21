import { Router } from "express";
import { DashboardController } from "../controllers/DashboardController";
import { autenticarToken } from "../middlewares/auth-jwt";

export class DashboardRoutes {
    private router: Router;
    private dashboardController: DashboardController;

    constructor() {
        this.router = Router();
        this.dashboardController = new DashboardController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
/*        this.router.get(
            "/tickets-by-type",
            autenticarToken,
            this.dashboardController.getTicketsByType.bind(this.dashboardController)
        );
        this.router.get(
            "/tickets-by-status",
            autenticarToken,
            this.dashboardController.getTicketsByStatus.bind(this.dashboardController)
        );
        this.router.get(
            "/tickets-by-priority",
            autenticarToken,
            this.dashboardController.getTicketsByPriority.bind(this.dashboardController)
        ); */
        this.router.get(
            "/tickets-by-analyst",
            autenticarToken,
            this.dashboardController.getTicketsByAnalyst.bind(this.dashboardController)
        );
        this.router.get(
            "/summary",
            autenticarToken,
            this.dashboardController.getDashboardSummary.bind(this.dashboardController)
        );
    }

    public getRouter(): Router {
        return this.router;
    }
}
