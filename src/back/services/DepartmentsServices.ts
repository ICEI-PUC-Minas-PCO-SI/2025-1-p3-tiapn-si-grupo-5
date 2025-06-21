import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

export class DepartmentsService {
    async getAllActiveDepartments() {
        return prisma.gerencia.findMany({ where: { ativo: 1 } });
    }

    async createDepartments(nomeGerencia: string) {
        return prisma.gerencia.create({
            data: {
                nomeGerencia,
                ativo: 1
            }
        });
    }

    async updateDepartments(idGerencia: number, nomeGerencia: string) {
        return prisma.gerencia.update({
            where: { idGerencia: Number(idGerencia) },
            data: { nomeGerencia }
        });
    }

    async deleteDepartments(idGerencia: number): Promise<unknown> {
        const userCount = await prisma.usuario.count({
            where: { idGerencia: Number(idGerencia) }
        });
        if (userCount > 0) {
            const error = new Error("Não é possível excluir uma gerência associada a usuários.") as Error & { code?: string };
            error.code = "ASSOCIATED_USERS";
            throw error;
        }
        return prisma.gerencia.delete({
            where: { idGerencia: Number(idGerencia) }
        });
    }
}
