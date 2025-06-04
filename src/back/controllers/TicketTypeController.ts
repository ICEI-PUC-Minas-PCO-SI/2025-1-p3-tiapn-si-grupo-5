import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export class TicketTypeController {
    async getTicketTypes(req: Request, res: Response) {
        try {
            const tipos = await prisma.tipochamado.findMany();
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
            const novoTipo = await prisma.tipochamado.create({
                data: {
                    nomeTipo,
                    ativo: 1
                }
            });
            res.status(201).json(novoTipo);
        } catch (error) {
            console.error("Erro ao criar tipo de chamado:", error);
            res.status(500).json({ error: "Erro ao criar tipo de chamado" });
        }
    }

    async updateTicketType(req: Request, res: Response) {
        try {
            const { idTipoChamado, nomeTipo } = req.body;
            const tipoAtualizado = await prisma.tipochamado.update({
                where: { idTipoChamado: Number(idTipoChamado) },
                data: { nomeTipo }
            });
            res.json(tipoAtualizado);
        } catch (error) {
            console.error("Erro ao atualizar tipo de chamado:", error);
            res.status(500).json({ error: "Erro ao atualizar tipo de chamado" });
        }
    }

    async deleteTicketType(req: Request, res: Response) {
        try {
            const { idTipoChamado } = req.body;
            await prisma.tipochamado.delete({ where: { idTipoChamado: Number(idTipoChamado) } });
            res.status(204).send();
        } catch (error) {
            console.error("Erro ao deletar tipo de chamado:", error);
            res.status(500).json({ error: "Erro ao deletar tipo de chamado" });
        }
    }
}
