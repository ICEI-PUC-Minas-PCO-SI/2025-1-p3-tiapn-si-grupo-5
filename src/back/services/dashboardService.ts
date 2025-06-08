import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

export class DashboardService {
    async getTicketsByType(idTipoChamado: number) {
        return prisma.chamado.findMany({
            where: { idTipoChamado }
        });
    }

    async getTicketsByStatus(idStatus: number) {
        return prisma.chamado.findMany({
            where: { idStatus }
        });
    }

    async getTicketsByPriority(idPrioridade: number) {
        return prisma.chamado.findMany({
            where: { idPrioridade }
        });
    }

    async getTicketsByAnalyst(idAnalista: number) {
        return prisma.chamado.findMany({
            where: { idAnalista }
        });
    }

    async getClosedTickets() {
        return prisma.chamado.findMany({
            where: {
                dataFechamento: {
                    not: null
                }
            }
        });
    }
}
