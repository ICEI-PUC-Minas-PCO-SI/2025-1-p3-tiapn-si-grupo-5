import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

export class NotificationService {
    async createNotification({
        titulo,
        mensagem,
        idUsuario,
        idChamado,
    }: {
        titulo: string;
        mensagem: string;
        idUsuario: number;
        idChamado?: number;
    }) {
        return prisma.notificacao.create({
            data: {
                titulo,
                mensagem,
                idUsuario,
                idChamado: idChamado ?? null,
            }
        });
    }

    async getUserNotifications(idUsuario: number) {
        return prisma.notificacao.findMany({
            where: { idUsuario },
            orderBy: { dataHora: "desc" }
        });
    }

    async markAllAsReadForChamado(idUsuario: number, idChamado: number) {
        return prisma.notificacao.updateMany({
            where: {
                idUsuario,
                idChamado,
                lida: 0
            },
            data: { lida: 1 }
        });
    }

    async getUnreadChamados(idUsuario: number) {
        const notificacoes = await prisma.notificacao.findMany({
            where: {
                idUsuario,
                lida: 0,
                idChamado: { not: null }
            },
            select: { idChamado: true }
        });
        return [...new Set(notificacoes.map(n => n.idChamado))];
    }
}
