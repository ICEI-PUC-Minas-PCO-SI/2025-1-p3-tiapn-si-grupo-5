import { Request, Response } from "express";
import { StatusService } from "../services/statusService";

const statusService = new StatusService();

export class StatusController {
    async getStatus(req: Request, res: Response) {
        try {
            const status = await statusService.getStatus();
            res.json(status);
            console.log("Status ativos:", JSON.stringify(status));
        } catch (error) {
            console.error("Erro ao buscar status:", error);
            res.status(500).json({ error: "Error ao buscar status" });
        }
    }

    async createStatus(req: Request, res: Response) {
        try {
            const { nomeStatus, color } = req.body;
            const novoStatus = await statusService.createStatus(nomeStatus, color);
            res.status(201).json(novoStatus);
        } catch (error) {
            console.error("Erro ao criar status:", error);
            res.status(500).json({ error: "Erro ao criar status" });
        }
    }

    async updateStatus(req: Request, res: Response) {
        try {
            const { idStatus, nomeStatus, color } = req.body;
            const statusAtualizado = await statusService.updateStatus(idStatus, nomeStatus, color);
            res.json(statusAtualizado);
        } catch (error) {
            console.error("Erro ao atualizar status:", error);
            res.status(500).json({ error: "Erro ao atualizar status" });
        }
    }

    async deleteStatus(req: Request, res: Response) {
        try {
            const { idStatus } = req.body;
            await statusService.deleteStatus(idStatus);
            res.status(204).send();
        } catch (error) {
            const err = error as { code?: string; message?: string };
            console.error("Erro ao deletar status:", error);
            if (err.code === "ASSOCIATED_TICKETS") {
                res.status(400).json({ error: "Não é possível excluir um status associado a chamados." });
            } else {
                res.status(500).json({ error: "Erro ao deletar status" });
            }
        }
    }
}