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
            const tickets = await ticketService.getTicketsByAnalystId(idAnalista);
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

    async updateTicketAnalyst(req: Request, res: Response) {
        try {
            const idChamado = Number(req.params.idChamado);
            const { idAnalista } = req.body;
            if (!idAnalista) {
                return res.status(400).json({ error: "idAnalista é obrigatório para atribuição." });
            }
            const ticket = await ticketService.updateTicketAnalyst(idChamado, Number(idAnalista));
            res.status(200).json(ticket);
        } catch (error) {
            console.error("Erro ao atualizar analista do chamado:", error);
            res.status(500).json({ error: "Erro ao atualizar analista do chamado" });
        }
    }

    async updateTicketStatus(req: Request, res: Response) {
        try {
            const idChamado = Number(req.params.idChamado);
            const { idStatus } = req.body;
            if (!idStatus) {
                return res.status(400).json({ error: "idStatus é obrigatório para atualizar o status." });
            }
            const ticket = await ticketService.updateTicketStatus(idChamado, Number(idStatus));
            res.status(200).json(ticket);
        } catch (error) {
            console.error("Erro ao atualizar status do chamado:", error);
            res.status(500).json({ error: "Erro ao atualizar status do chamado" });
        }
    }

    async closeTicket(req: Request, res: Response) {
        try {
            const idChamado = Number(req.params.idChamado);
            const { dataFechamento } = req.body;
            if (!dataFechamento) {
                return res.status(400).json({ error: "dataFechamento é obrigatório para encerrar o chamado." });
            }
            const ticket = await ticketService.closeTicket(idChamado, new Date(dataFechamento));
            res.status(200).json(ticket);
        } catch (error) {
            console.error("Erro ao encerrar chamado:", error);
            res.status(500).json({ error: "Erro ao encerrar chamado" });
        }
    }

    async getTeamTickets(req: Request, res: Response) {
        try {
            // @ts-expect-error usuario injetado pelo middleware de autenticação
            const idGerencia = req.usuario.gerencia;
            const tickets = await ticketService.getTicketsByManagement(idGerencia);
            res.json(tickets);
        } catch (error) {
            console.error("Erro ao buscar chamados da equipe:", error);
            res.status(500).json({ error: "Erro ao buscar chamados da equipe" });
        }
    }

    async getTicketsByAnalystId(req: Request, res: Response) {
        try {
            const idAnalista = Number(req.params.idAnalista);
            const tickets = await ticketService.getTicketsByAnalystId(idAnalista);
            res.json(tickets);
        } catch (error) {
            console.error("Erro ao buscar chamados do analista:", error);
            res.status(500).json({ error: "Erro ao buscar chamados do analista" });
        }
    }

    async getTicketsBySolicitanteId(req: Request, res: Response) {
        try {
            const idSolicitante = Number(req.params.idSolicitante);
            const tickets = await ticketService.getTicketsBySolicitanteId(idSolicitante);
            res.json(tickets);
        } catch (error) {
            console.error("Erro ao buscar chamados do usuário:", error);
            res.status(500).json({ error: "Erro ao buscar chamados do usuário" });
        }
    }

    async getTicketById(req: Request, res: Response) {
        try {
            const idChamado = Number(req.params.idChamado);
            if (!idChamado) {
                return res.status(400).json({ error: "idChamado é obrigatório" });
            }
            const ticket = await ticketService.getTicketById(idChamado);
            if (!ticket) {
                return res.status(404).json({ error: "Chamado não encontrado" });
            }
            res.json(ticket);
        } catch (error) {
            console.error("Erro ao buscar chamado por id:", error);
            res.status(500).json({ error: "Erro ao buscar chamado por id" });
        }
    }
}