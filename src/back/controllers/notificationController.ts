import { Request, Response } from "express";
import { NotificationService } from "../services/notificationService";

const notificationService = new NotificationService();

export class NotificationController {
    async getUserNotifications(req: Request, res: Response) {
        const idUsuario = Number(req.params.idUsuario);
        if (!idUsuario) return res.status(400).json({ error: "idUsuario obrigatório" });
        const notifications = await notificationService.getUserNotifications(idUsuario);
        res.json(notifications);
    }

    async markAsRead(req: Request, res: Response) {
        const idNotificacao = Number(req.params.idNotificacao);
        if (!idNotificacao) return res.status(400).json({ error: "idNotificacao obrigatório" });
        await notificationService.markAsRead(idNotificacao);
        res.status(204).send();
    }
}
