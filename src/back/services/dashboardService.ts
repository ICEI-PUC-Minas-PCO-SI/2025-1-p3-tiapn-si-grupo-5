import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

export class DashboardService {
    async getTicketsByType(idTipoChamado: number, idAnalista?: number) {
        return prisma.chamado.findMany({
            where: {
                idTipoChamado,
                ...(idAnalista ? { idAnalista } : {})
            }
        });
    }

    async getTicketsByStatus(idStatus: number, idAnalista?: number) {
        return prisma.chamado.findMany({
            where: {
                idStatus,
                ...(idAnalista ? { idAnalista } : {})
            }
        });
    }

    async getTicketsByPriority(idPrioridade: number, idAnalista?: number) {
        return prisma.chamado.findMany({
            where: {
                idPrioridade,
                ...(idAnalista ? { idAnalista } : {})
            }
        });
    }

    async getTicketsByAnalyst(idAnalista: number) {
        return prisma.chamado.findMany({
            where: { idAnalista }
        });
    }
}