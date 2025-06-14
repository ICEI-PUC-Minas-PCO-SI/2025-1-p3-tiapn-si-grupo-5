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

    async markAsRead(idNotificacao: number) {
        return prisma.notificacao.update({
            where: { idNotificacao },
            data: { lida: 1 }
        });
    }
}
