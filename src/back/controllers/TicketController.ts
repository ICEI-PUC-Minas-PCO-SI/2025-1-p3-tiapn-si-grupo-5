import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();


export class TicketController {
    async createTicket(req: Request, res: Response) {
        try {
            const { assunto, descricao, idSolicitante, idTipoChamado } = req.body;
            const dataAbertura = new Date();
            const ticket = await prisma.chamado.create({
                data: {
                    protocolo: "", // temporário
                    assunto,
                    descricao,
                    dataAbertura,
                    idSolicitante,
                    idTipoChamado,
                    idStatus: null,      // Futuramente obrigatório
                    idPrioridade: null,  // Futuramente obrigatório
                },
            });
            const ano = dataAbertura.getFullYear().toString().slice(-2);
            const idZero = ticket.idChamado.toString().padStart(6, "0");
            const protocolo = `${idZero}${ano}`;

            const ticketAtualizado = await prisma.chamado.update({
                where: { idChamado: ticket.idChamado },
                data: { protocolo }
            });
            res.status(201).json(ticketAtualizado);
        } catch (error) {
            console.error("Erro ao criar chamado:", error);
            res.status(500).json({ error: "Erro ao criar chamado" });
        }
    }
}