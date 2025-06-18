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

    async markAllAsReadForChamado(req: Request, res: Response) {
        const idUsuario = Number(req.params.idUsuario);
        const idChamado = Number(req.params.idChamado);
        if (!idUsuario || !idChamado) return res.status(400).json({ error: "idUsuario e idChamado obrigatórios" });
        await notificationService.markAllAsReadForChamado(idUsuario, idChamado);
        res.status(204).send();
    }

    async getUnreadChamados(req: Request, res: Response) {
        const idUsuario = Number(req.params.idUsuario);
        if (!idUsuario) return res.status(400).json({ error: "idUsuario obrigatório" });
        const chamados = await notificationService.getUnreadChamados(idUsuario);
        res.json(chamados);
    }
}
