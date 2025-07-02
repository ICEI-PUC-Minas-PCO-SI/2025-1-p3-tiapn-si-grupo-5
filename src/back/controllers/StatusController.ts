import { Request, Response } from "express";
import { StatusService } from "../services/StatusService";
import { logger } from "../logger/Logger";

const statusService = new StatusService();

export class StatusController {
    async getStatus(req: Request, res: Response) {
        try {
            // @ts-expect-error usuario injetado pelo middleware
            const requestUserId = req.usuario?.id;

            logger.info('StatusController', 'GET_STATUS', requestUserId);

            const status = await statusService.getStatus();
            res.json(status);
        } catch (error) {
            logger.error('StatusController', 'GET_STATUS_ERROR', undefined, error as Error);
            res.status(500).json({ error: "Error ao buscar status" });
        }
    }

    async createStatus(req: Request, res: Response) {
        try {
            const { nomeStatus, hexCorPrimaria, hexCorSecundaria } = req.body;
            // @ts-expect-error usuario injetado pelo middleware
            const requestUserId = req.usuario?.id;

            const novoStatus = await statusService.createStatus(nomeStatus, hexCorPrimaria, hexCorSecundaria);

            logger.logCreate('StatusController', 'STATUS', novoStatus.idStatus, requestUserId, {
                nomeStatus,
                hexCorPrimaria,
                hexCorSecundaria
            });

            res.status(201).json(novoStatus);
        } catch (error) {
            logger.error('StatusController', 'CREATE_STATUS_ERROR', undefined, error as Error);
            res.status(500).json({ error: "Erro ao criar status" });
        }
    }

    async updateStatus(req: Request, res: Response) {
        try {
            const { idStatus, nomeStatus, hexCorPrimaria, hexCorSecundaria } = req.body;
            // @ts-expect-error usuario injetado pelo middleware
            const requestUserId = req.usuario?.id;

            logger.logUpdate('StatusController', 'STATUS', idStatus, requestUserId, {
                nomeStatus,
                hexCorPrimaria,
                hexCorSecundaria
            });

            const statusAtualizado = await statusService.updateStatus(idStatus, nomeStatus, hexCorPrimaria, hexCorSecundaria);
            res.json(statusAtualizado);
        } catch (error) {
            logger.error('StatusController', 'UPDATE_STATUS_ERROR', undefined, error as Error);
            res.status(500).json({ error: "Erro ao atualizar status" });
        }
    }

    async deleteStatus(req: Request, res: Response) {
        try {
            const { idStatus } = req.body;
            // @ts-expect-error usuario injetado pelo middleware
            const requestUserId = req.usuario?.id;

            logger.logDelete('StatusController', 'STATUS', idStatus, requestUserId);

            await statusService.deleteStatus(idStatus);
            res.status(204).send();
        } catch (error) {
            const err = error as { code?: string; message?: string };
            logger.error('StatusController', 'DELETE_STATUS_ERROR', undefined, error as Error);
            if (err.code === "ASSOCIATED_TICKETS") {
                res.status(400).json({ error: "Não é possível excluir um status associado a chamados." });
            } else {
                res.status(500).json({ error: "Erro ao deletar status" });
            }
        }
    }
}