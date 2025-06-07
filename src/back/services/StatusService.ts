import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

export class StatusService {
    async getStatus() {
        return prisma.statuschamado.findMany();
    }

    async createStatus(nomeStatus: string, color: string) {
        return prisma.statuschamado.create({
            data: {
                nomeStatus,
                hexCorPrimaria: color,
                hexCorSecundaria: color,
                ativo: 1
            }
        });
    }

    async updateStatus(idStatus: number, nomeStatus: string, color: string) {
        return prisma.statuschamado.update({
            where: { idStatus: Number(idStatus) },
            data: {
                nomeStatus,
                hexCorPrimaria: color,
                hexCorSecundaria: color
            }
        });
    }

    async deleteStatus(idStatus: number): Promise<unknown> {
        const chamadoCount = await prisma.chamado.count({
            where: { idStatus: Number(idStatus) }
        });
        if (chamadoCount > 0) {
            const error = new Error("Não é possível excluir um status associado a chamados.") as Error & { code?: string };
            error.code = "ASSOCIATED_TICKETS";
            throw error;
        }
        return prisma.statuschamado.delete({
            where: { idStatus: Number(idStatus) }
        });
    }
}
