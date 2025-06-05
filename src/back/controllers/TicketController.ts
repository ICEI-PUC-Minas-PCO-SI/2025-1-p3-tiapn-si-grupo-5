import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();


export class TicketController {
    async createTicket(req: Request, res: Response) {
        try {
            const { assunto, descricao, idSolicitante, idPrioridade, idStatus } = req.body;
            const dataAbertura = new Date();

            const ticket = await prisma.chamado.create({
                data: {
                    protocolo: "", // temporário
                    assunto,
                    descricao,
                    dataAbertura,
                    idSolicitante,
                    idStatus: idStatus ?? 1,
                    idPrioridade: idPrioridade ?? 2 
                },
            });
            const ano = dataAbertura.getFullYear().toString().slice(-2);
            const idZero = ticket.idChamado.toString().padStart(6, "0");
            const protocolo = `${idZero}${ano}`;

            // Atualiza o chamado com o protocolo correto
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

    async assignTicket(req: Request, res: Response) {
        try {
            const idChamado = Number(req.params.id);
            // @ts-ignore
            const idAnalista = req.usuario?.id;
            if (!idAnalista) {
                res.status(401).json({ error: "Usuário não autenticado" });
                return;
            }
            const chamado = await prisma.chamado.update({
                where: { idChamado },
                data: {
                    idAnalista,
                    idStatus: 2 
                }
            });
            res.json(chamado);
        } catch (error) {
            console.error("Erro ao assumir chamado:", error);
            res.status(500).json({ error: "Erro ao assumir chamado" });
        }
    }

    async getAllTickets(req: Request, res: Response) {
        try {
            // @ts-ignore
            const user = req.usuario;
            let chamados;
            if (user && user.tipo === 'analista' && req.query.meus === 'true') {
                // Apenas chamados do analista logado
                chamados = await prisma.chamado.findMany({
                    where: { idAnalista: user.id },
                    include: { prioridadechamado: true }
                });
            } else if (user && user.tipo === 'analista') {
                // Apenas chamados não atribuídos
                chamados = await prisma.chamado.findMany({
                    where: { idAnalista: null },
                    include: { prioridadechamado: true }
                });
            } else {
                // Padrão: retorna todos
                chamados = await prisma.chamado.findMany({
                    include: { prioridadechamado: true }
                });
            }
            const chamadosComPrioridade = chamados.map((chamado) => ({
                ...chamado,
                prioridade: chamado.prioridadechamado?.nomePrioridade || null
            }));
            res.json(chamadosComPrioridade);
        } catch (error) {
            console.error("Erro ao buscar chamados:", error);
            res.status(500).json({ error: "Erro ao buscar chamados" });
        }
    }
}