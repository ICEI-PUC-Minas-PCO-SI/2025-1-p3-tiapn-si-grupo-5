import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

export class StatusService {
    async getStatus() {
        return prisma.statuschamado.findMany();
    }

    async createStatus(nomeStatus: string, hexCorPrimaria: string, hexCorSecundaria: string) {
        return prisma.statuschamado.create({
            data: {
                nomeStatus,
                hexCorPrimaria,
                hexCorSecundaria,
                ativo: 1
            }
        });
    }

    async updateStatus(idStatus: number, nomeStatus: string, hexCorPrimaria: string, hexCorSecundaria: string) {
        return prisma.statuschamado.update({
            where: { idStatus: Number(idStatus) },
            data: {
                nomeStatus,
                hexCorPrimaria,
                hexCorSecundaria
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
