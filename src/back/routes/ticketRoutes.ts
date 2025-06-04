import { Router } from "express";
import { TicketController } from "../controllers/TicketController";

export class TicketRoutes {
    private router: Router;
    private ticketController: TicketController;

    constructor() {
        this.router = Router();
        this.ticketController = new TicketController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/tickets", this.ticketController.createTicket.bind(this.ticketController));
    }

    public getRouter(): Router {
        return this.router;
    }
}