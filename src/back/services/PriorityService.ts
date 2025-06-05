import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

export class PriorityService {
    async getPriorities() {
        return prisma.prioridadechamado.findMany();
    }

    async createPriority(nomePrioridade: string, color: string) {
        return prisma.prioridadechamado.create({
            data: {
                nomePrioridade,
                hexCorPrimaria: color,
                hexCorSecundaria: color,
                ativo: 1
            }
        });
    }

    async updatePriority(idPrioridade: number, nomePrioridade: string, color: string) {
        return prisma.prioridadechamado.update({
            where: { idPrioridade: Number(idPrioridade) },
            data: {
                nomePrioridade,
                hexCorPrimaria: color,
                hexCorSecundaria: color
            }
        });
    }

    async deletePriority(idPrioridade: number): Promise<unknown> {
        const chamadoCount = await prisma.chamado.count({
            where: { idPrioridade: Number(idPrioridade) }
        });
        if (chamadoCount > 0) {
            const error = new Error("Não é possível excluir uma prioridade associada a chamados.") as Error & { code?: string };
            error.code = "ASSOCIATED_TICKETS";
            throw error;
        }
        return prisma.prioridadechamado.delete({
            where: { idPrioridade: Number(idPrioridade) }
        });
    }
}
