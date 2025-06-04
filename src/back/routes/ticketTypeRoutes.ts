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
        this.router.get('/tipo-chamado', this.ticketTypeController.getTicketTypes.bind(this.ticketTypeController));
        this.router.post('/tipo-chamado', this.ticketTypeController.createTicketType.bind(this.ticketTypeController));
        this.router.put('/tipo-chamado', this.ticketTypeController.updateTicketType.bind(this.ticketTypeController));
        this.router.delete('/tipo-chamado', this.ticketTypeController.deleteTicketType.bind(this.ticketTypeController));
    }

    public getRouter(): Router {
        return this.router;
    }
}
