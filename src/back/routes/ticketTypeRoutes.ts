import { Router } from 'express';
import { TicketTypeController } from '../controllers/TicketTypeController';

export class TicketTypeRoutes {
    private router: Router;
    private ticketTypeController: TicketTypeController;

    constructor() {
        this.router = Router();
        this.ticketTypeController = new TicketTypeController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/ticket-types', this.ticketTypeController.getTicketTypes.bind(this.ticketTypeController));
        this.router.post('/ticket-types', this.ticketTypeController.createTicketType.bind(this.ticketTypeController));
        this.router.put('/ticket-types/:id', this.ticketTypeController.updateTicketType.bind(this.ticketTypeController));
        this.router.delete('/ticket-types/:id', this.ticketTypeController.deleteTicketType.bind(this.ticketTypeController));
    }

    public getRouter(): Router {
        return this.router;
    }
}
