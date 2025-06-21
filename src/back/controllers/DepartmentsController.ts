import { Request, Response } from "express";
import { DepartmentsService } from "../services/DepartmentsServices";

const departmentsService = new DepartmentsService();

export class DepartmentsController {
    async getAllActiveDepartments(req: Request, res: Response) {
        try {
            const activeDepartmentss = await departmentsService.getAllActiveDepartments();
            res.json(activeDepartmentss);
        } catch (error) {
            console.error("Erro ao buscar gerências ativas:", error);
            res.status(500).json({ error: "Erro ao buscar gerências ativas" });
        }
    }

    async createDepartments(req: Request, res: Response) {
        try {
            const { nomeGerencia } = req.body;
            const novaGerencia = await departmentsService.createDepartments(nomeGerencia);
            res.status(201).json(novaGerencia);
        } catch (error) {
            console.error("Erro ao criar gerência:", error);
            res.status(500).json({ error: "Erro ao criar gerência" });
        }
    }

    async updateDepartments(req: Request, res: Response) {
        try {
            const { idGerencia, nomeGerencia } = req.body;
            const gerenciaAtualizada = await departmentsService.updateDepartments(idGerencia, nomeGerencia);
            res.json(gerenciaAtualizada);
        } catch (error) {
            console.error("Erro ao atualizar gerência:", error);
            res.status(500).json({ error: "Erro ao atualizar gerência" });
        }
    }

    async deleteDepartments(req: Request, res: Response) {
        try {
            const { idGerencia } = req.body;
            await departmentsService.deleteDepartments(idGerencia);
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