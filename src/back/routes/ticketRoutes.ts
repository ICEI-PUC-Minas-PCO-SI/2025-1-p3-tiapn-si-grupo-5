import { Router } from "express";
import { TicketController } from "../controllers/TicketController";
import { autenticarToken } from "../middlewares/authJWT";

export class TicketRoutes {
    private router: Router;
    private ticketController: TicketController;

    constructor() {
        this.router = Router();
        this.ticketController = new TicketController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/", this.ticketController.createTicket.bind(this.ticketController));
        this.router.patch(
            "/:id/assign",
            autenticarToken,
            this.ticketController.assignTicket.bind(this.ticketController)
        );
        this.router.get("/", this.ticketController.getAllTickets.bind(this.ticketController));
    }

    public getRouter(): Router {
        return this.router;
    }
}