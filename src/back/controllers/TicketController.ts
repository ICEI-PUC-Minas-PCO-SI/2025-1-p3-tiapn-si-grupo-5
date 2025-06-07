import { Request, Response } from "express";
import { TicketService } from "../services/ticketService";

const ticketService = new TicketService();

export class TicketController {
    async createTicket(req: Request, res: Response) {
        try {
            const { assunto, descricao, idSolicitante, idTipoChamado, idPrioridade } = req.body;
            const ticket = await ticketService.createTicket(assunto, descricao, idSolicitante, idTipoChamado, idPrioridade);
            res.status(201).json(ticket);
        } catch (error) {
            const err = error as { code?: string; message?: string };
            console.error("Erro ao criar chamado:", error);
            if (err.code === "ASSOCIATED_TICKETS") {
                res.status(400).json({ error: "Não é possível criar chamado associado a parâmetros inválidos." });
            } else {
                res.status(500).json({ error: "Erro ao criar chamado" });
            }
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

    async getUnassignedTickets(req: Request, res: Response) {
        try {
            const tickets = await ticketService.getUnassignedTickets();
            res.json(tickets);
        } catch (error) {
            console.error("Erro ao buscar chamados não atribuídos:", error);
            res.status(500).json({ error: "Erro ao buscar chamados não atribuídos" });
        }
    }

    async getMyTickets(req: Request, res: Response) {
        try {
            // @ts-expect-error usuario injetado pelo middleware de autenticação
            const idAnalista = req.usuario.id;
            const tickets = await ticketService.getTicketsByAnalyst(idAnalista);
            res.json(tickets);
        } catch (error) {
            console.error("Erro ao buscar meus chamados:", error);
            res.status(500).json({ error: "Erro ao buscar meus chamados" });
        }
    }

    async assignTicket(req: Request, res: Response) {
        try {
            const idChamado = Number(req.params.idChamado);
            // @ts-expect-error usuario injetado pelo middleware de autenticação
            const idAnalista = req.usuario.id;
            const ticket = await ticketService.assignTicket(idChamado, idAnalista);
            res.status(200).json(ticket);
        } catch (error) {
            console.error("Erro ao assumir chamado:", error);
            res.status(500).json({ error: "Erro ao assumir chamado" });
        }
    }
}