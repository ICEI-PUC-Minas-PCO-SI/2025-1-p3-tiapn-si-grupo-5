import { Router } from "express";
import { TicketController } from "../controllers/ticketController";
import { autenticarToken } from "../middlewares/auth-jwt";
import { validatePayload } from "../middlewares/validate-payload";
import { z } from "zod";

// Schema para criação de ticket
const ticketCreateSchema = z.object({
    assunto: z.string().min(3),
    descricao: z.string().min(3),
    idSolicitante: z.number(),
    idPrioridade: z.number(),
    idTipoChamado: z.number()
});

export class TicketRoutes {
    private router: Router;
    private ticketController: TicketController;

    constructor() {
        this.router = Router();
        this.ticketController = new TicketController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            "/tickets",
            validatePayload(ticketCreateSchema),
            this.ticketController.createTicket.bind(this.ticketController)
        );
        this.router.get("/tickets", this.ticketController.getAllTickets.bind(this.ticketController));
        this.router.get("/tickets/unassigned", autenticarToken, this.ticketController.getUnassignedTickets.bind(this.ticketController));
        this.router.get("/tickets/my", autenticarToken, this.ticketController.getMyTickets.bind(this.ticketController));
        this.router.patch("/tickets/:idChamado/assign", autenticarToken, this.ticketController.assignTicket.bind(this.ticketController));
    }

    public getRouter(): Router {
        return this.router;
    }
}