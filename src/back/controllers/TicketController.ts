import { Request, Response } from "express";
import { TicketService } from "../services/TicketService";

const ticketService = new TicketService();

export class TicketController {
    async createTicket(req: Request, res: Response) {
        try {
            const { assunto, descricao, idSolicitante, idTipoChamado } = req.body;
            const ticket = await ticketService.createTicket(assunto, descricao, idSolicitante, idTipoChamado);
            res.status(201).json(ticket);
        } catch (error) {
            console.error("Erro ao criar chamado:", error);
            res.status(500).json({ error: "Erro ao criar chamado" });
        }
    }

    async getAllTickets(req: Request, res: Response) {
        try {
            const tickets = await ticketService.getAllTickets();
            res.json(tickets);
        } catch (error) {
            console.error("Erro ao buscar chamados:", error);
            res.status(500).json({ error: "Erro ao buscar chamados" });
        }
    }
}