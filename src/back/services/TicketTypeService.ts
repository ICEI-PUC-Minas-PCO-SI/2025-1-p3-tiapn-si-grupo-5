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

    async deleteTicketType(idTipoChamado: number) {
        return prisma.tipochamado.delete({
            where: { idTipoChamado: Number(idTipoChamado) }
        });
    }
}
