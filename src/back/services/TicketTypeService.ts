import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

export class TicketTypeService {
    async getTicketTypes() {
        return prisma.tipochamado.findMany();
    }

    async createTicketType(nomeTipo: string) {
        return prisma.tipochamado.create({
            data: {
                nomeTipo,
                ativo: 1
            }
        });
    }

    async updateTicketType(idTipoChamado: number, nomeTipo: string) {
        return prisma.tipochamado.update({
            where: { idTipoChamado: Number(idTipoChamado) },
            data: { nomeTipo }
        });
    }

    async deleteTicketType(idTipoChamado: number): Promise<unknown> {
        const chamadoCount = await prisma.chamado.count({
            where: { idTipoChamado: Number(idTipoChamado) }
        });
        if (chamadoCount > 0) {
            const error = new Error("Não é possível excluir um tipo de chamado associado a chamados.") as Error & { code?: string };
            error.code = "ASSOCIATED_TICKETS";
            throw error;
        }
        return prisma.tipochamado.delete({
            where: { idTipoChamado: Number(idTipoChamado) }
        });
    }
}
