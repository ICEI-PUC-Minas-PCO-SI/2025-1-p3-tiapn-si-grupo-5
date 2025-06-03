import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export class ManagementController {
    async getAllActiveManagement(req: Request, res: Response) {
        try {
            const activeManagements = await prisma.gerencia.findMany();
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
                const novaGerencia = await prisma.gerencia.create({
                    data: {
                        nomeGerencia,
                        ativo: 1,
                    }
                });
                res.status(201).json(novaGerencia);
            } catch (error) {
                console.error("Erro ao criar gerência:", error);
                res.status(500).json({ error: "Erro ao criar gerência" });
            }
        }
    
        async updateManagement(req: Request, res: Response) {
            try {
                const { idGerencia, nomeGerencia } = req.body;
                const gerenciaAtualizada = await prisma.gerencia.update({
                    where: { idGerencia: Number(idGerencia) },
                    data: {
                        nomeGerencia,
                    }
                });
                res.json(gerenciaAtualizada);
            } catch (error) {
                console.error("Erro ao atualizar gerência:", error);
                res.status(500).json({ error: "Erro ao atualizar gerência" });
            }
        }
    
        async deleteManagement(req: Request, res: Response) {
            try {
                const { idGerencia } = req.body;
                await prisma.gerencia.delete({ where: { idGerencia } });
                res.status(204).send();
            } catch (error) {
                console.error("Erro ao deletar status:", error);
                res.status(500).json({ error: "Erro ao deletar status" });
            }
        }
}