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

    async deletePriority(idPrioridade: number) {
        return prisma.prioridadechamado.delete({
            where: { idPrioridade: Number(idPrioridade) }
        });
    }
}
