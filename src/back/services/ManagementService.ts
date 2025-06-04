import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

export class ManagementService {
    async getAllActiveManagement() {
        return prisma.gerencia.findMany();
    }

    async createManagement(nomeGerencia: string) {
        return prisma.gerencia.create({
            data: {
                nomeGerencia,
                ativo: 1
            }
        });
    }

    async updateManagement(idGerencia: number, nomeGerencia: string) {
        return prisma.gerencia.update({
            where: { idGerencia: Number(idGerencia) },
            data: { nomeGerencia }
        });
    }

    async deleteManagement(idGerencia: number) {
        return prisma.gerencia.delete({
            where: { idGerencia: Number(idGerencia) }
        });
    }
}
