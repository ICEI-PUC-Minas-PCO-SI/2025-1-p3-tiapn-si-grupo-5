import { Request, Response } from "express";
import { ChatService } from "../services/ChatService";
import { logger } from "../logger/Logger";

const chatService = new ChatService();

export class ChatController {
    async getMessagesByChamado(req: Request, res: Response) {
        try {
            const idChamado = Number(req.params.idChamado);

            if (!idChamado) return res.status(400).json({ error: "idChamado é obrigatório" });

            const messages = await chatService.getMessagesByChamado(idChamado);
            res.json(messages);
        } catch (error) {
            logger.error('ChatController', 'GET_MESSAGES_ERROR', undefined, error as Error);
            res.status(500).json({ error: "Erro ao buscar mensagens do chamado" });
        }
    }
}