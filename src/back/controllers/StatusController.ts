import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export class StatusController {
    async getStatus(req: Request, res: Response) {
        try {
            const status = await prisma.statuschamado.findMany();
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
            const novoStatus = await prisma.statuschamado.create({
                data: {
                    nomeStatus,
                    hexCorPrimaria: color,
                    hexCorSecundaria: color, // valor padrão igual à primária
                    ativo: 1
                }
            });
            res.status(201).json(novoStatus);
        } catch (error) {
            console.error("Erro ao criar status:", error);
            res.status(500).json({ error: "Erro ao criar status" });
        }
    }

    async updateStatus(req: Request, res: Response) {
        try {
            const { idStatus, nomeStatus, color } = req.body;
            const statusAtualizado = await prisma.statuschamado.update({
                where: { idStatus: Number(idStatus) },
                data: {
                    nomeStatus,
                    hexCorPrimaria: color,
                    hexCorSecundaria: color // mantém igual à primária
                }
            });
            res.json(statusAtualizado);
        } catch (error) {
            console.error("Erro ao atualizar status:", error);
            res.status(500).json({ error: "Erro ao atualizar status" });
        }
    }

    async deleteStatus(req: Request, res: Response) {
        try {
            const { idStatus } = req.body;
            await prisma.statuschamado.delete({ where: { idStatus } });
            res.status(204).send();
        } catch (error) {
            console.error("Erro ao deletar status:", error);
            res.status(500).json({ error: "Erro ao deletar status" });
        }
    }
}