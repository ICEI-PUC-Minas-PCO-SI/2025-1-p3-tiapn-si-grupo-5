import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

export class TicketService {
    async createTicket(
        assunto: string,
        descricao: string,
        idSolicitante: number,
        idTipoChamado: number,
        idPrioridade: number
    ) {
        const dataAbertura = new Date();
        const ticket = await prisma.chamado.create({
            data: {
                protocolo: "",
                assunto,
                descricao,
                dataAbertura,
                idSolicitante,
                idTipoChamado,
                idPrioridade,
                idStatus: null,
            },
        });
        const ano = dataAbertura.getFullYear().toString().slice(-2);
        const idZero = ticket.idChamado.toString().padStart(6, "0");
        const protocolo = `${idZero}${ano}`;

        return prisma.chamado.update({
            where: { idChamado: ticket.idChamado },
            data: { protocolo }
        });
    }

    async getAllTickets() {
        return prisma.chamado.findMany();
    }

    async getUnassignedTickets() {
        return prisma.chamado.findMany({
            where: { idAnalista: null }
        });
    }

    async getTicketsByAnalystId(idAnalista: number) {
        return prisma.chamado.findMany({
            where: { idAnalista }
        });
    }

    async getTicketsBySolicitanteId(idSolicitante: number) {
        return prisma.chamado.findMany({
            where: { idSolicitante }
        });
    }

    async assignTicket(idChamado: number, idAnalista: number) {
        return prisma.chamado.update({
            where: { idChamado },
            data: { idAnalista }
        });
    }

    async updateTicketAnalyst(idChamado: number, idAnalista: number) {
        return prisma.chamado.update({
            where: { idChamado },
            data: { idAnalista }
        });
    }

    async getTicketsByManagement(idGerencia: number) {
        return prisma.chamado.findMany({
            where: {
                idAnalista: { not: null },
                usuario_chamado_idAnalistaTousuario: {
                    idGerencia: idGerencia
                }
            }
        });
    }

    async getTicketById(idChamado: number) {
        return prisma.chamado.findUnique({
            where: { idChamado },
            include: {
                usuario_chamado_idSolicitanteTousuario: true,
                usuario_chamado_idAnalistaTousuario: true,
                prioridadechamado: true,
                statuschamado: true,
                tipochamado: true,
            }
        });
    }

    async updateTicketStatus(idChamado: number, idStatus: number) {
        return prisma.chamado.update({
            where: { idChamado },
            data: { idStatus }
        });
    }

    async closeTicket(idChamado: number, dataFechamento: Date) {
        return prisma.chamado.update({
            where: { idChamado },
            data: { dataFechamento }
        });
    }
}
