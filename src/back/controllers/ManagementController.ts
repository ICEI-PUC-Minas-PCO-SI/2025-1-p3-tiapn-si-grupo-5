import { Request, Response } from "express";
import { ManagementService } from "../services/managementService";

const managementService = new ManagementService();

export class ManagementController {
    async getAllActiveManagement(req: Request, res: Response) {
        try {
            const activeManagements = await managementService.getAllActiveManagement();
            res.json(activeManagements);
            console.log("Gerências ativas:", JSON.stringify(activeManagements));
        } catch (error) {
            console.error("Erro ao buscar gerências ativas:", error);
            res.status(500).json({ error: "Erro ao buscar gerências ativas" });
        }
    }

    async createManagement(req: Request, res: Response) {
        try {
            const { nomeGerencia } = req.body;
            const novaGerencia = await managementService.createManagement(nomeGerencia);
            res.status(201).json(novaGerencia);
        } catch (error) {
            console.error("Erro ao criar gerência:", error);
            res.status(500).json({ error: "Erro ao criar gerência" });
        }
    }

    async updateManagement(req: Request, res: Response) {
        try {
            const { idGerencia, nomeGerencia } = req.body;
            const gerenciaAtualizada = await managementService.updateManagement(idGerencia, nomeGerencia);
            res.json(gerenciaAtualizada);
        } catch (error) {
            console.error("Erro ao atualizar gerência:", error);
            res.status(500).json({ error: "Erro ao atualizar gerência" });
        }
    }

    async deleteManagement(req: Request, res: Response) {
        try {
            const { idGerencia } = req.body;
            await managementService.deleteManagement(idGerencia);
            res.status(204).send();
        } catch (error) {
            const err = error as { code?: string; message?: string };
            console.error("Erro ao deletar gerência:", error);
            if (err.code === "ASSOCIATED_USERS") {
                res.status(400).json({ error: "Não é possível excluir uma gerência associada a usuários." });
            } else {
                res.status(500).json({ error: "Erro ao deletar gerência" });
            }
        }
    }
}