import { Request, Response } from "express";
import { DepartmentsService } from "../services/DepartmentsServices";
import { logger } from "../logger/Logger";

const departmentsService = new DepartmentsService();

export class DepartmentsController {
    async getAllActiveDepartments(req: Request, res: Response) {
        try {
            // @ts-expect-error usuario injetado pelo middleware
            const requestUserId = req.usuario?.id;

            logger.info('DepartmentsController', 'GET_ACTIVE_DEPARTMENTS', requestUserId);

            const activeDepartmentss = await departmentsService.getAllActiveDepartments();
            res.json(activeDepartmentss);
        } catch (error) {
            logger.error('DepartmentsController', 'GET_ACTIVE_DEPARTMENTS_ERROR', undefined, error as Error);
            res.status(500).json({ error: "Erro ao buscar gerências ativas" });
        }
    }

    async createDepartments(req: Request, res: Response) {
        try {
            const { nomeGerencia } = req.body;
            // @ts-expect-error usuario injetado pelo middleware
            const requestUserId = req.usuario?.id;

            const novaGerencia = await departmentsService.createDepartments(nomeGerencia);

            logger.logCreate('DepartmentsController', 'DEPARTMENT', novaGerencia.idGerencia, requestUserId, { nomeGerencia });

            res.status(201).json(novaGerencia);
        } catch (error) {
            logger.error('DepartmentsController', 'CREATE_DEPARTMENT_ERROR', undefined, error as Error);
            res.status(500).json({ error: "Erro ao criar gerência" });
        }
    }

    async updateDepartments(req: Request, res: Response) {
        try {
            const { idGerencia, nomeGerencia } = req.body;
            // @ts-expect-error usuario injetado pelo middleware
            const requestUserId = req.usuario?.id;

            logger.logUpdate('DepartmentsController', 'DEPARTMENT', idGerencia, requestUserId, { nomeGerencia });

            const gerenciaAtualizada = await departmentsService.updateDepartments(idGerencia, nomeGerencia);
            res.json(gerenciaAtualizada);
        } catch (error) {
            logger.error('DepartmentsController', 'UPDATE_DEPARTMENT_ERROR', undefined, error as Error);
            res.status(500).json({ error: "Erro ao atualizar gerência" });
        }
    }

    async deleteDepartments(req: Request, res: Response) {
        try {
            const { idGerencia } = req.body;
            // @ts-expect-error usuario injetado pelo middleware
            const requestUserId = req.usuario?.id;

            logger.logDelete('DepartmentsController', 'DEPARTMENT', idGerencia, requestUserId);

            await departmentsService.deleteDepartments(idGerencia);
            res.status(204).send();
        } catch (error) {
            const err = error as { code?: string; message?: string };
            logger.error('DepartmentsController', 'DELETE_DEPARTMENT_ERROR', undefined, error as Error);
            if (err.code === "ASSOCIATED_USERS") {
                res.status(400).json({ error: "Não é possível excluir uma gerência associada a usuários." });
            } else {
                res.status(500).json({ error: "Erro ao deletar gerência" });
            }
        }
    }
}