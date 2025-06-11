import { Router } from 'express';
import { TicketTypeController } from '../controllers/TicketTypeController';
import { autenticarToken } from '../middlewares/auth-jwt';
import { validatePayload } from "../middlewares/validate-payload";
import { z } from "zod";

// Schemas para validação
const ticketTypeCreateSchema = z.object({
    nomeTipo: z.string().min(3)
});
const ticketTypeUpdateSchema = z.object({
    idTipoChamado: z.union([z.number(), z.string()]),
    nomeTipo: z.string().min(3)
});

export class TicketTypeRoutes {
    private router: Router;
    private ticketTypeController: TicketTypeController;

    constructor() {
        this.router = Router();
        this.ticketTypeController = new TicketTypeController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(
            '/ticket-types',
            this.ticketTypeController.getTicketTypes.bind(this.ticketTypeController)
        );
        this.router.post(
            '/ticket-types',
            autenticarToken, 
            validatePayload(ticketTypeCreateSchema),
            this.ticketTypeController.createTicketType.bind(this.ticketTypeController)
        );
        this.router.put(
            '/ticket-types/:id',
            autenticarToken,
            validatePayload(ticketTypeUpdateSchema),
            this.ticketTypeController.updateTicketType.bind(this.ticketTypeController)
        );
        this.router.delete(
            '/ticket-types/:id',
            autenticarToken,
            this.ticketTypeController.deleteTicketType.bind(this.ticketTypeController)
        );
    }

    public getRouter(): Router {
        return this.router;
    }
}
