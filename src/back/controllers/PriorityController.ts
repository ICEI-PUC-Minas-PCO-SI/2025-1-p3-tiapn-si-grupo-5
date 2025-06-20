import { Request, Response } from "express";
import { PriorityService } from "../services/priorityService";

const priorityService = new PriorityService();

export class PriorityController {
    async getPriorities(req: Request, res: Response) {
        try {
            const priorities = await priorityService.getPriorities();
            res.json(priorities);
        } catch (error) {
            console.error("Erro ao buscar prioridades:", error);
            res.status(500).json({ error: "Erro ao buscar prioridades" });
        }
    }

    async createPriority(req: Request, res: Response) {
        try {
            const { nomePrioridade, hexCorPrimaria, hexCorSecundaria } = req.body;
            const novaPrioridade = await priorityService.createPriority(nomePrioridade, hexCorPrimaria, hexCorSecundaria);
            res.status(201).json(novaPrioridade);
        } catch (error) {
            console.error("Erro ao criar prioridade:", error);
            res.status(500).json({ error: "Erro ao criar prioridade" });
        }
    }

    async updatePriority(req: Request, res: Response) {
        try {
            const { idPrioridade, nomePrioridade, hexCorPrimaria, hexCorSecundaria } = req.body;
            const prioridadeAtualizada = await priorityService.updatePriority(idPrioridade, nomePrioridade, hexCorPrimaria, hexCorSecundaria);
            res.json(prioridadeAtualizada);
        } catch (error) {
            console.error("Erro ao atualizar prioridade:", error);
            res.status(500).json({ error: "Erro ao atualizar prioridade" });
        }
    }

    async deletePriority(req: Request, res: Response) {
        try {
            const { idPrioridade } = req.body;
            await priorityService.deletePriority(idPrioridade);
            res.status(204).send();
        } catch (error) {
            const err = error as { code?: string; message?: string };
            console.error("Erro ao deletar prioridade:", error);
            if (err.code === "ASSOCIATED_TICKETS") {
                res.status(400).json({ error: "Não é possível excluir uma prioridade associada a chamados." });
            } else {
                res.status(500).json({ error: "Erro ao deletar prioridade" });
            }
        }
    }
}
