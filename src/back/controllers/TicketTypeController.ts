import { Request, Response } from "express";
import { TicketTypeService } from "../services/TicketTypeService";

const ticketTypeService = new TicketTypeService();

export class TicketTypeController {
    async getTicketTypes(req: Request, res: Response) {
        try {
            const tipos = await ticketTypeService.getTicketTypes();
            res.json(tipos);
            console.log("Tipos de chamado:", JSON.stringify(tipos));
        } catch (error) {
            console.error("Erro ao buscar tipos de chamado:", error);
            res.status(500).json({ error: "Erro ao buscar tipos de chamado" });
        }
    }

    async createTicketType(req: Request, res: Response) {
        try {
            const { nomeTipo } = req.body;
            const novoTipo = await ticketTypeService.createTicketType(nomeTipo);
            res.status(201).json(novoTipo);
        } catch (error) {
            console.error("Erro ao criar tipo de chamado:", error);
            res.status(500).json({ error: "Erro ao criar tipo de chamado" });
        }
    }

    async updateTicketType(req: Request, res: Response) {
        try {
            const { idTipoChamado, nomeTipo } = req.body;
            const tipoAtualizado = await ticketTypeService.updateTicketType(idTipoChamado, nomeTipo);
            res.json(tipoAtualizado);
        } catch (error) {
            console.error("Erro ao atualizar tipo de chamado:", error);
            res.status(500).json({ error: "Erro ao atualizar tipo de chamado" });
        }
    }

    async deleteTicketType(req: Request, res: Response) {
        try {
            const idTipoChamado = Number(req.params.id);
            await ticketTypeService.deleteTicketType(idTipoChamado);
            res.status(204).send();
        } catch (error) {
            const err = error as { code?: string; message?: string };
            console.error("Erro ao deletar tipo de chamado:", error);
            if (err.code === "ASSOCIATED_TICKETS") {
                res.status(400).json({ error: "Não é possível excluir um tipo de chamado associado a chamados." });
            } else {
                res.status(500).json({ error: "Erro ao deletar tipo de chamado" });
            }
        }
    }
}
