import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

export class DashboardService {
    /*     
    
    -- NÃO MAIS UTILIZADO, MAS MANTIDO PARA REFERÊNCIA --
    
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
    
    */

    async getTicketsByAnalyst(idAnalista: number) {
        return prisma.chamado.findMany({
            where: { idAnalista }
        });
    }

    async getDashboardSummary() {
        // Busca todos os tickets, status, prioridades e tipos de chamados
        const [tickets, statusList, priorities, ticketTypes] = await Promise.all([
            prisma.chamado.findMany(),
            prisma.statuschamado.findMany(),
            prisma.prioridadechamado.findMany(),
            prisma.tipochamado.findMany(),
        ]);

        return {
            tickets,
            statusList,
            priorities,
            ticketTypes,
        };
    }

    async getAnalystDashboardSummary(idAnalista: number) {
        const [tickets, statusList, priorities, ticketTypes] = await Promise.all([
            prisma.chamado.findMany({ where: { idAnalista } }),
            prisma.statuschamado.findMany(),
            prisma.prioridadechamado.findMany(),
            prisma.tipochamado.findMany(),
        ]);
        return {
            tickets,
            statusList,
            priorities,
            ticketTypes,
        };
    }
}
