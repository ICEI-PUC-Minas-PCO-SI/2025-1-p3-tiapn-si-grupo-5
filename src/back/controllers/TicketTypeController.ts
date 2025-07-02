import { Request, Response } from "express";
import { TicketTypeService } from "../services/TicketTypeService";
import { logger } from "../logger/Logger";

const ticketTypeService = new TicketTypeService();

export class TicketTypeController {
    async getTicketTypes(req: Request, res: Response) {
        try {
            const tipos = await ticketTypeService.getTicketTypes();
            res.json(tipos);
        } catch (error) {
            logger.error('TicketTypeController', 'GET_TICKET_TYPES_ERROR', undefined, error as Error);
            console.error("Erro ao buscar tipos de chamado:", error);
            res.status(500).json({ error: "Erro ao buscar tipos de chamado" });
        }
    }

    async createTicketType(req: Request, res: Response) {
        try {
            const { nomeTipo } = req.body;
            // @ts-expect-error usuario injetado pelo middleware
            const requestUserId = req.usuario?.id;

            const novoTipo = await ticketTypeService.createTicketType(nomeTipo);

            logger.logCreate('TicketTypeController', 'TICKET_TYPE', novoTipo.idTipoChamado, requestUserId, { nomeTipo });

            res.status(201).json(novoTipo);
        } catch (error) {
            logger.error('TicketTypeController', 'CREATE_TICKET_TYPE_ERROR', undefined, error as Error);
            console.error("Erro ao criar tipo de chamado:", error);
            res.status(500).json({ error: "Erro ao criar tipo de chamado" });
        }
    }

    async updateTicketType(req: Request, res: Response) {
        try {
            const { idTipoChamado, nomeTipo } = req.body;
            // @ts-expect-error usuario injetado pelo middleware
            const requestUserId = req.usuario?.id;

            logger.logUpdate('TicketTypeController', 'TICKET_TYPE', idTipoChamado, requestUserId, { nomeTipo });

            const tipoAtualizado = await ticketTypeService.updateTicketType(idTipoChamado, nomeTipo);
            res.json(tipoAtualizado);
        } catch (error) {
            logger.error('TicketTypeController', 'UPDATE_TICKET_TYPE_ERROR', undefined, error as Error);
            console.error("Erro ao atualizar tipo de chamado:", error);
            res.status(500).json({ error: "Erro ao atualizar tipo de chamado" });
        }
    }

    async deleteTicketType(req: Request, res: Response) {
        try {
            const idTipoChamado = Number(req.params.id);
            // @ts-expect-error usuario injetado pelo middleware
            const requestUserId = req.usuario?.id;

            logger.logDelete('TicketTypeController', 'TICKET_TYPE', idTipoChamado, requestUserId);

            await ticketTypeService.deleteTicketType(idTipoChamado);
            res.status(204).send();
        } catch (error) {
            const err = error as { code?: string; message?: string };
            logger.error('TicketTypeController', 'DELETE_TICKET_TYPE_ERROR', undefined, error as Error);
            console.error("Erro ao deletar tipo de chamado:", error);
            if (err.code === "ASSOCIATED_TICKETS") {
                res.status(400).json({ error: "Não é possível excluir um tipo de chamado associado a chamados." });
            } else {
                res.status(500).json({ error: "Erro ao deletar tipo de chamado" });
            }
        }
    }
}
