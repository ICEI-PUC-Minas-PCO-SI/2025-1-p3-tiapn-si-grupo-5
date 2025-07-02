import { Request, Response } from "express";
import { NotificationService } from "../services/NotificationService";
import { logger } from "../logger/Logger";

const notificationService = new NotificationService();

export class NotificationController {
    async getUserNotifications(req: Request, res: Response) {
        try {
            const idUsuario = Number(req.params.idUsuario);

            if (!idUsuario) return res.status(400).json({ error: "idUsuario obrigatório" });

            const notifications = await notificationService.getUserNotifications(idUsuario);
            res.json(notifications);
        } catch (error) {
            logger.error('NotificationController', 'GET_USER_NOTIFICATIONS_ERROR', undefined, error as Error);
            res.status(500).json({ error: "Erro ao buscar notificações do usuário" });
        }
    }

    async markAllAsReadForChamado(req: Request, res: Response) {
        try {
            const idUsuario = Number(req.params.idUsuario);
            const idChamado = Number(req.params.idChamado);
            // @ts-expect-error usuario injetado pelo middleware
            const requestUserId = req.usuario?.id;

            if (!idUsuario || !idChamado) return res.status(400).json({ error: "idUsuario e idChamado obrigatórios" });

            logger.logUpdate('NotificationController', 'NOTIFICATION_READ_STATUS', idChamado, requestUserId, {
                targetUserId: idUsuario,
                action: 'MARK_ALL_READ'
            });

            await notificationService.markAllAsReadForChamado(idUsuario, idChamado);
            res.status(204).send();
        } catch (error) {
            logger.error('NotificationController', 'MARK_READ_ERROR', undefined, error as Error);
            res.status(500).json({ error: "Erro ao marcar notificações como lidas" });
        }
    }

    async getUnreadChamados(req: Request, res: Response) {
        try {
            const idUsuario = Number(req.params.idUsuario);

            if (!idUsuario) return res.status(400).json({ error: "idUsuario obrigatório" });

            const chamados = await notificationService.getUnreadChamados(idUsuario);
            res.json(chamados);
        } catch (error) {
            logger.error('NotificationController', 'GET_UNREAD_TICKETS_ERROR', undefined, error as Error);
            res.status(500).json({ error: "Erro ao buscar chamados não lidos" });
        }
    }
}
