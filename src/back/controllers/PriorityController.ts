import { Request, Response } from "express";
import { PriorityService } from "../services/PriorityService";
import { logger } from "../logger/Logger";

const priorityService = new PriorityService();

export class PriorityController {
    async getPriorities(req: Request, res: Response) {
        try {
            // @ts-expect-error usuario injetado pelo middleware
            const requestUserId = req.usuario?.id;

            logger.info('PriorityController', 'GET_PRIORITIES', requestUserId);

            const priorities = await priorityService.getPriorities();
            res.json(priorities);
        } catch (error) {
            logger.error('PriorityController', 'GET_PRIORITIES_ERROR', undefined, error as Error);
            res.status(500).json({ error: "Erro ao buscar prioridades" });
        }
    }

    async createPriority(req: Request, res: Response) {
        try {
            const { nomePrioridade, hexCorPrimaria, hexCorSecundaria } = req.body;
            // @ts-expect-error usuario injetado pelo middleware
            const requestUserId = req.usuario?.id;

            const novaPrioridade = await priorityService.createPriority(nomePrioridade, hexCorPrimaria, hexCorSecundaria);

            logger.logCreate('PriorityController', 'PRIORITY', novaPrioridade.idPrioridade, requestUserId, {
                nomePrioridade,
                hexCorPrimaria,
                hexCorSecundaria
            });

            res.status(201).json(novaPrioridade);
        } catch (error) {
            logger.error('PriorityController', 'CREATE_PRIORITY_ERROR', undefined, error as Error);
            res.status(500).json({ error: "Erro ao criar prioridade" });
        }
    }

    async updatePriority(req: Request, res: Response) {
        try {
            const { idPrioridade, nomePrioridade, hexCorPrimaria, hexCorSecundaria } = req.body;
            // @ts-expect-error usuario injetado pelo middleware
            const requestUserId = req.usuario?.id;

            logger.logUpdate('PriorityController', 'PRIORITY', idPrioridade, requestUserId, {
                nomePrioridade,
                hexCorPrimaria,
                hexCorSecundaria
            });

            const prioridadeAtualizada = await priorityService.updatePriority(idPrioridade, nomePrioridade, hexCorPrimaria, hexCorSecundaria);
            res.json(prioridadeAtualizada);
        } catch (error) {
            logger.error('PriorityController', 'UPDATE_PRIORITY_ERROR', undefined, error as Error);
            res.status(500).json({ error: "Erro ao atualizar prioridade" });
        }
    }

    async deletePriority(req: Request, res: Response) {
        try {
            const { idPrioridade } = req.body;
            // @ts-expect-error usuario injetado pelo middleware
            const requestUserId = req.usuario?.id;

            logger.logDelete('PriorityController', 'PRIORITY', idPrioridade, requestUserId);

            await priorityService.deletePriority(idPrioridade);
            res.status(204).send();
        } catch (error) {
            const err = error as { code?: string; message?: string };
            logger.error('PriorityController', 'DELETE_PRIORITY_ERROR', undefined, error as Error);
            if (err.code === "ASSOCIATED_TICKETS") {
                res.status(400).json({ error: "Não é possível excluir uma prioridade associada a chamados." });
            } else {
                res.status(500).json({ error: "Erro ao deletar prioridade" });
            }
        }
    }
}
