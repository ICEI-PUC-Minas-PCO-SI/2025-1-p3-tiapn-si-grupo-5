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

    async deleteStatus(idStatus: number) {
        return prisma.statuschamado.delete({
            where: { idStatus: Number(idStatus) }
        });
    }
}
