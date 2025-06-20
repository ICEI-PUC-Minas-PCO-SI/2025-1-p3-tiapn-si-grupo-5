import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

export class TicketService {
    async createTicket(
        assunto: string,
        descricao: string,
        idSolicitante: number,
        idTipoChamado: number,
        idPrioridade: number,
        urlAnexo?: string,
        nomeArquivo?: string
    ) {
        console.log("[TicketService] Recebido para criar ticket:", {
            assunto, descricao, idSolicitante, idTipoChamado, idPrioridade, urlAnexo, nomeArquivo
        });
        const dataAbertura = new Date();
        const ticket = await prisma.chamado.create({
            data: {
                protocolo: "",
                assunto,
                descricao,
                dataAbertura,
                idSolicitante,
                idTipoChamado,
                idPrioridade,
                idStatus: null,
                urlAnexo: urlAnexo ?? null,
                nomeArquivo: nomeArquivo ?? null
            },
        });
        console.log("[TicketService] Ticket criado no banco (pré-protocolo):", ticket);
        const ano = dataAbertura.getFullYear().toString().slice(-2);
        const idZero = ticket.idChamado.toString().padStart(6, "0");
        const protocolo = `${idZero}${ano}`;

        const updatedTicket = await prisma.chamado.update({
            where: { idChamado: ticket.idChamado },
            data: { protocolo }
        });
        console.log("[TicketService] Ticket atualizado com protocolo:", updatedTicket);
        return updatedTicket;
    }

    async getAllTickets() {
        return prisma.chamado.findMany({
            include: {
                statuschamado: true,
                prioridadechamado: true
            }
        });
    }

    async getUnassignedTickets() {
        return prisma.chamado.findMany({
            where: { idAnalista: null },
            include: {
                statuschamado: true,
                prioridadechamado: true
            }
        });
    }

    async getTicketsByAnalystId(idAnalista: number) {
        return prisma.chamado.findMany({
            where: { idAnalista },
            include: {
                statuschamado: true,
                prioridadechamado: true
            }
        });
    }

    async getTicketsBySolicitanteId(idSolicitante: number) {
        return prisma.chamado.findMany({
            where: { idSolicitante },
            include: {
                statuschamado: true,
                prioridadechamado: true
            }
        });
    }

    async assignTicket(idChamado: number, idAnalista: number) {
        return prisma.chamado.update({
            where: { idChamado },
            data: { idAnalista }
        });
    }

    async updateTicketAnalyst(idChamado: number, idAnalista: number) {
        return prisma.chamado.update({
            where: { idChamado },
            data: { idAnalista }
        });
    }

    async getTicketsByManagement(idGerencia: number) {
        return prisma.chamado.findMany({
            where: {
                idAnalista: { not: null },
                usuario_chamado_idAnalistaTousuario: {
                    idGerencia: idGerencia
                }
            },
            include: {
                statuschamado: true,
                prioridadechamado: true
            }
        });
    }

    async getTicketById(idChamado: number) {
        return prisma.chamado.findUnique({
            where: { idChamado },
            include: {
                usuario_chamado_idSolicitanteTousuario: {
                    select: {
                        idUsuario: true,
                        nomeUsuario: true,
                        email: true,
                        gerencia: {
                            select: {
                                nomeGerencia: true
                            }
                        }
                    }
                },
                usuario_chamado_idAnalistaTousuario: {
                    select: {
                        idUsuario: true,
                        nomeUsuario: true,
                        gerencia: {
                            select: {
                                nomeGerencia: true
                            }
                        }
                    }
                },
                prioridadechamado: {
                    select: {
                        idPrioridade: true,
                        nomePrioridade: true,
                        hexCorPrimaria: true,
                        hexCorSecundaria: true
                    }
                },
                statuschamado: {
                    select: {
                        idStatus: true,
                        nomeStatus: true,
                        hexCorPrimaria: true,
                        hexCorSecundaria: true
                    }
                },
                tipochamado: {
                    select: {
                        idTipoChamado: true,
                        nomeTipo: true
                    }
                },
            }
        });
    }

    async updateTicketStatus(idChamado: number, idStatus: number) {
        return prisma.chamado.update({
            where: { idChamado },
            data: { idStatus }
        });
    }

    async closeTicket(idChamado: number, dataFechamento: Date) {
        return prisma.chamado.update({
            where: { idChamado },
            data: { dataFechamento }
        });
    }

    async reopenTicket(idChamado: number) {
        return prisma.chamado.update({
            where: { idChamado },
            data: { dataFechamento: null }
        });
    }

    async createChatMessage(
        idChamado: number,
        idRemetente: number,
        mensagem: string,
        remetente: "usuario" | "analista" | "gestor",
        urlAnexo?: string,
        nomeArquivo?: string
    ) {
        return prisma.msgchamado.create({
            data: {
                idChamado,
                idRemetente,
                mensagem,
                remetente,
                urlAnexo: urlAnexo ?? null,
                nomeArquivo: nomeArquivo ?? null,
            }
        });
    }
}
