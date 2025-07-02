import { Request, Response } from "express";
import { TicketService } from "../services/TicketService";
import { uploadFileToCloudinary } from "../services/UploadService";
import fs from "fs";
import { sendTicketStatusChangeEmail } from "../services/EmailServices";
import { NotificationService } from "../services/NotificationService";
import { logger } from "../logger/Logger";

export const ticketService = new TicketService();
const notificationService = new NotificationService();

export class TicketController {
    async createTicket(req: Request, res: Response) {
        try {
            const { assunto, descricao, idSolicitante, idTipoChamado, idPrioridade, nomeArquivo, urlAnexo } = req.body;

            if (!assunto || !descricao || !idSolicitante || !idTipoChamado || !idPrioridade) {
                return res.status(400).json({ error: "Campos obrigatórios ausentes." });
            }

            let urlAnexoFinal: string | undefined = urlAnexo;
            let nomeArquivoFinal: string | undefined = nomeArquivo;

            // Só faz upload se vier arquivo (compatibilidade)
            if (req.file) {
                logger.logFileUpload(Number(idSolicitante), req.file.originalname, 'TicketController');
                const result = await uploadFileToCloudinary(req.file.path, req.file.originalname);
                urlAnexoFinal = result.secure_url;
                nomeArquivoFinal = req.file.originalname;
                fs.unlinkSync(req.file.path);
            }
            const ticket = await ticketService.createTicket(
                assunto,
                descricao,
                Number(idSolicitante),
                Number(idTipoChamado),
                Number(idPrioridade),
                urlAnexoFinal,
                nomeArquivoFinal
            );

            logger.logCreate('TicketController', 'TICKET', ticket.idChamado, Number(idSolicitante), {
                assunto,
                tipoChamado: idTipoChamado,
                prioridade: idPrioridade,
                hasAttachment: !!urlAnexoFinal
            });

            res.status(201).json(ticket);
        } catch (error) {
            const err = error as { code?: string; message?: string };
            logger.error('TicketController', 'CREATE_TICKET_ERROR', undefined, error as Error);
            if (err.code === "ASSOCIATED_TICKETS") {
                res.status(400).json({ error: "Não é possível criar chamado associado a parâmetros inválidos." });
            } else {
                res.status(500).json({ error: "Erro ao criar chamado" });
            }
        }
    }

    async getAllTickets(req: Request, res: Response) {
        try {
            const tickets = await ticketService.getAllTickets();
            res.json(tickets);
        } catch {
            res.status(500).json({ error: "Erro ao buscar chamados" });
        }
    }

    async getUnassignedTickets(req: Request, res: Response) {
        try {
            const tickets = await ticketService.getUnassignedTickets();
            res.json(tickets);
        } catch {
            res.status(500).json({ error: "Erro ao buscar chamados não atribuídos" });
        }
    }

    async getMyTickets(req: Request, res: Response) {
        try {
            // @ts-expect-error usuario injetado pelo middleware de autenticação
            const idAnalista = req.usuario.id;
            const tickets = await ticketService.getTicketsByAnalystId(idAnalista);
            res.json(tickets);
        } catch {
            res.status(500).json({ error: "Erro ao buscar meus chamados" });
        }
    }

    async assignTicket(req: Request, res: Response) {
        try {
            const idChamado = Number(req.params.idChamado);
            // @ts-expect-error usuario injetado pelo middleware de autenticação
            const idAnalista = req.usuario.id;

            logger.logUpdate('TicketController', 'TICKET_ASSIGNMENT', idChamado, idAnalista, {
                action: 'SELF_ASSIGN'
            });

            const ticket = await ticketService.assignTicket(idChamado, idAnalista);
            res.status(200).json(ticket);
        } catch (error) {
            logger.error('TicketController', 'ASSIGN_TICKET_ERROR', undefined, error as Error);
            res.status(500).json({ error: "Erro ao assumir chamado" });
        }
    }

    async updateTicketAnalyst(req: Request, res: Response) {
        try {
            const idChamado = Number(req.params.idChamado);
            const { idAnalista } = req.body;
            // @ts-expect-error usuario injetado pelo middleware
            const requestUserId = req.usuario?.id;

            if (!idAnalista) {
                return res.status(400).json({ error: "idAnalista é obrigatório para atribuição." });
            }

            logger.logUpdate('TicketController', 'TICKET_ANALYST', idChamado, requestUserId, {
                newAnalyst: idAnalista
            });

            const ticket = await ticketService.updateTicketAnalyst(idChamado, Number(idAnalista));
            res.status(200).json(ticket);
        } catch (error) {
            logger.error('TicketController', 'UPDATE_ANALYST_ERROR', undefined, error as Error);
            res.status(500).json({ error: "Erro ao atualizar analista do chamado" });
        }
    }

    async updateTicketStatus(req: Request, res: Response) {
        try {
            const idChamado = Number(req.params.idChamado);
            const { idStatus } = req.body;
            // @ts-expect-error usuario injetado pelo middleware
            const requestUserId = req.usuario?.id;

            if (!idStatus) {
                return res.status(400).json({ error: "idStatus é obrigatório para atualizar o status." });
            }

            logger.logUpdate('TicketController', 'TICKET_STATUS', idChamado, requestUserId, {
                newStatus: idStatus
            });

            const ticket = await ticketService.updateTicketStatus(idChamado, Number(idStatus));
            // Notificar usuário sobre a alteração de status
            const fullTicket = await ticketService.getTicketById(idChamado);
            if (fullTicket && fullTicket.usuario_chamado_idSolicitanteTousuario?.email) {
                const novoStatus = fullTicket.statuschamado?.nomeStatus || "Atualizado";

                // Criar notificação no banco de dados
                await notificationService.createNotification({
                    titulo: "Status do chamado alterado",
                    mensagem: `O status do seu chamado #${fullTicket.idChamado} foi alterado para: ${novoStatus}`,
                    idUsuario: fullTicket.idSolicitante!,
                    idChamado: fullTicket.idChamado
                });

                await sendTicketStatusChangeEmail({
                    to: fullTicket.usuario_chamado_idSolicitanteTousuario.email,
                    nomeUsuario: fullTicket.usuario_chamado_idSolicitanteTousuario.nomeUsuario,
                    idChamado: fullTicket.idChamado,
                    assunto: fullTicket.assunto,
                    novoStatus
                });
            }
            res.status(200).json(ticket);
        } catch (error) {
            logger.error('TicketController', 'UPDATE_STATUS_ERROR', undefined, error as Error);
            res.status(500).json({ error: "Erro ao atualizar status do chamado" });
        }
    }

    async closeTicket(req: Request, res: Response) {
        try {
            const idChamado = Number(req.params.idChamado);
            const { dataFechamento } = req.body;
            // @ts-expect-error usuario injetado pelo middleware
            const requestUserId = req.usuario?.id;

            if (!dataFechamento) {
                return res.status(400).json({ error: "dataFechamento é obrigatório para encerrar o chamado." });
            }

            logger.critical('TicketController', 'CLOSE_TICKET', requestUserId, {
                ticketId: idChamado,
                closeDate: dataFechamento
            });

            const ticket = await ticketService.closeTicket(idChamado, new Date(dataFechamento));
            // Notificar usuário sobre o fechamento
            const fullTicket = await ticketService.getTicketById(idChamado);
            if (fullTicket && fullTicket.usuario_chamado_idSolicitanteTousuario?.email) {
                // Criar notificação no banco de dados
                await notificationService.createNotification({
                    titulo: "Chamado fechado",
                    mensagem: `Seu chamado #${fullTicket.idChamado} foi fechado.`,
                    idUsuario: fullTicket.idSolicitante!,
                    idChamado: fullTicket.idChamado
                });

                await sendTicketStatusChangeEmail({
                    to: fullTicket.usuario_chamado_idSolicitanteTousuario.email,
                    nomeUsuario: fullTicket.usuario_chamado_idSolicitanteTousuario.nomeUsuario,
                    idChamado: fullTicket.idChamado,
                    assunto: fullTicket.assunto,
                    novoStatus: "Fechado"
                });
            }
            res.status(200).json(ticket);
        } catch (error) {
            logger.error('TicketController', 'CLOSE_TICKET_ERROR', undefined, error as Error);
            res.status(500).json({ error: "Erro ao encerrar chamado" });
        }
    }

    async getTeamTickets(req: Request, res: Response) {
        try {
            // @ts-expect-error usuario injetado pelo middleware de autenticação
            const idGerencia = req.usuario.gerencia;
            const tickets = await ticketService.getTicketsByManagement(idGerencia);
            res.json(tickets);
        } catch {
            res.status(500).json({ error: "Erro ao buscar chamados da equipe" });
        }
    }

    async getTicketsByAnalystId(req: Request, res: Response) {
        try {
            const idAnalista = Number(req.params.idAnalista);
            const tickets = await ticketService.getTicketsByAnalystId(idAnalista);
            res.json(tickets);
        } catch {
            res.status(500).json({ error: "Erro ao buscar chamados do analista" });
        }
    }

    async getTicketsBySolicitanteId(req: Request, res: Response) {
        try {
            const idSolicitante = Number(req.params.idSolicitante);
            const tickets = await ticketService.getTicketsBySolicitanteId(idSolicitante);
            res.json(tickets);
        } catch {
            res.status(500).json({ error: "Erro ao buscar chamados do usuário" });
        }
    }

    async getTicketById(req: Request, res: Response) {
        try {
            const idChamado = Number(req.params.idChamado);
            if (!idChamado) {
                return res.status(400).json({ error: "idChamado é obrigatório" });
            }
            const ticket = await ticketService.getTicketById(idChamado);
            if (!ticket) {
                return res.status(404).json({ error: "Chamado não encontrado" });
            }
            res.json({
                ...ticket,
                urlAnexo: ticket.urlAnexo ?? null,
                nomeArquivo: ticket.nomeArquivo ?? null
            });
        } catch {
            res.status(500).json({ error: "Erro ao buscar chamado por id" });
        }
    }

    async reopenTicket(req: Request, res: Response) {
        try {
            const idChamado = Number(req.params.idChamado);
            // @ts-expect-error usuario injetado pelo middleware
            const requestUserId = req.usuario?.id;

            if (!idChamado) {
                return res.status(400).json({ error: "idChamado é obrigatório para reabrir o chamado." });
            }

            logger.critical('TicketController', 'REOPEN_TICKET', requestUserId, {
                ticketId: idChamado
            });

            const ticket = await ticketService.reopenTicket(idChamado);
            // Notificar usuário sobre a reabertura
            const fullTicket = await ticketService.getTicketById(idChamado);
            if (fullTicket && fullTicket.usuario_chamado_idSolicitanteTousuario?.email) {
                // Criar notificação no banco de dados
                await notificationService.createNotification({
                    titulo: "Chamado reaberto",
                    mensagem: `Seu chamado #${fullTicket.idChamado} foi reaberto.`,
                    idUsuario: fullTicket.idSolicitante!,
                    idChamado: fullTicket.idChamado
                });

                await sendTicketStatusChangeEmail({
                    to: fullTicket.usuario_chamado_idSolicitanteTousuario.email,
                    nomeUsuario: fullTicket.usuario_chamado_idSolicitanteTousuario.nomeUsuario,
                    idChamado: fullTicket.idChamado,
                    assunto: fullTicket.assunto,
                    novoStatus: "Reaberto"
                });
            }
            res.status(200).json(ticket);
        } catch (error) {
            logger.error('TicketController', 'REOPEN_TICKET_ERROR', undefined, error as Error);
            res.status(500).json({ error: "Erro ao reabrir chamado" });
        }
    }
}