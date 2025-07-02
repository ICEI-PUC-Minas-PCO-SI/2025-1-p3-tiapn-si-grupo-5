import { Server as SocketIOServer, Socket } from "socket.io";
import { PrismaClient } from "../generated/prisma";
import { ChatService } from "../services/ChatService";
import { sendNotificationEmail } from "../services/EmailServices";
import { NotificationService } from "../services/NotificationService";
import { logger } from "../logger/Logger";

const prisma = new PrismaClient();
const chatService = new ChatService();
const notificationService = new NotificationService();

type ChatSendData = {
    idChamado: number;
    idRemetente: number;
    mensagem: string;
    remetente: "usuario" | "analista" | "gestor";
    urlAnexo?: string;
    nomeArquivo?: string;
};

type JoinChamadoData = {
    idChamado: number;
    idUsuario: number;
};

export function setupChatSocket(io: SocketIOServer) {
    io.on("connection", (socket: Socket) => {
        logger.info('ChatSocket', 'SOCKET_CONNECTION', undefined, { socketId: socket.id });

        // Usuário entra em uma sala específica (ex: por idUsuario)
        socket.on("join", (userId: number) => {
            logger.info('ChatSocket', 'JOIN_USER_ROOM', userId, { socketId: socket.id });
            if (userId) socket.join(`user_${userId}`);
        });

        // Usuário tenta entrar em uma sala de chamado
        socket.on("joinChamado", async (data: JoinChamadoData) => {
            const { idChamado, idUsuario } = data || {};

            logger.info('ChatSocket', 'JOIN_CHAMADO_ATTEMPT', idUsuario, {
                idChamado,
                socketId: socket.id
            });

            if (!idChamado || !idUsuario) {
                logger.warn('ChatSocket', 'JOIN_CHAMADO_MISSING_DATA', idUsuario, {
                    idChamado,
                    socketId: socket.id
                });
                socket.emit("chat:error", { error: "Dados obrigatórios ausentes para entrar na sala do chamado." });
                return;
            }

            try {
                // Busca o chamado e o usuário
                const chamado = await prisma.chamado.findUnique({
                    where: { idChamado },
                    select: { idSolicitante: true, idAnalista: true }
                });
                const usuario = await prisma.usuario.findUnique({
                    where: { idUsuario },
                    select: { idTipoUsuario: true }
                });

                if (!chamado || !usuario) {
                    logger.warn('ChatSocket', 'JOIN_CHAMADO_NOT_FOUND', idUsuario, {
                        idChamado,
                        chamadoExists: !!chamado,
                        usuarioExists: !!usuario
                    });
                    socket.emit("chat:error", { error: "Chamado ou usuário não encontrado." });
                    return;
                }

                socket.join(`chamado_${idChamado}`);
                socket.data.userId = idUsuario;

                logger.info('ChatSocket', 'JOIN_CHAMADO_SUCCESS', idUsuario, {
                    idChamado,
                    socketId: socket.id,
                    roomName: `chamado_${idChamado}`
                });

                socket.emit("chat:joined", { idChamado });

                // Marcar notificações pendentes desse chamado como lidas para o usuário
                await notificationService.markAllAsReadForChamado(idUsuario, idChamado);

                logger.info('ChatSocket', 'NOTIFICATIONS_MARKED_READ', idUsuario, { idChamado });

            } catch (err) {
                logger.error('ChatSocket', 'JOIN_CHAMADO_ERROR', idUsuario, err as Error);
                socket.emit("chat:error", { error: "Erro ao validar permissão para entrar na sala do chamado.", err });
            }
        });

        socket.on("chat:send", async (data: ChatSendData) => {
            const { idChamado, idRemetente, mensagem, remetente, urlAnexo, nomeArquivo } = data;

            logger.info('ChatSocket', 'CHAT_MESSAGE_ATTEMPT', idRemetente, {
                idChamado,
                remetente,
                hasAttachment: !!(urlAnexo || nomeArquivo),
                messageLength: mensagem?.length || 0
            });

            try {
                if (!idChamado || !idRemetente || !mensagem || !remetente) {
                    logger.warn('ChatSocket', 'CHAT_MESSAGE_MISSING_DATA', idRemetente, {
                        idChamado,
                        hasMessage: !!mensagem,
                        remetente
                    });
                    socket.emit("chat:error", { error: "Dados obrigatórios ausentes." });
                    return;
                }

                // Salva no banco usando o ChatService
                const novaMensagem = await chatService.saveMessage({
                    idChamado,
                    idRemetente,
                    mensagem,
                    remetente,
                    urlAnexo,
                    nomeArquivo,
                });

                logger.logCreate('ChatSocket', 'CHAT_MESSAGE', novaMensagem.idMensagem, idRemetente, {
                    idChamado,
                    remetente,
                    hasAttachment: !!(urlAnexo || nomeArquivo)
                });

                // Busca a mensagem recém-criada com join do usuário
                const mensagemCompleta = await prisma.msgchamado.findUnique({
                    where: { idMensagem: novaMensagem.idMensagem },
                    include: {
                        usuario: {
                            select: {
                                nomeUsuario: true,
                                email: true,
                                fotoPerfil: true,
                                gerencia: {
                                    select: {
                                        nomeGerencia: true
                                    }
                                }
                            }
                        }
                    }
                });

                // Envia para todos na sala do chamado
                io.to(`chamado_${idChamado}`).emit("chat:receive", mensagemCompleta);

                logger.info('ChatSocket', 'CHAT_MESSAGE_BROADCASTED', idRemetente, {
                    idChamado,
                    messageId: novaMensagem.idMensagem,
                    roomName: `chamado_${idChamado}`
                });

                // Busca os dados do chamado e participantes
                const chamado = await prisma.chamado.findUnique({
                    where: { idChamado },
                    select: {
                        idSolicitante: true,
                        idAnalista: true,
                        assunto: true,
                        usuario_chamado_idSolicitanteTousuario: { select: { email: true, nomeUsuario: true } },
                        usuario_chamado_idAnalistaTousuario: { select: { email: true, nomeUsuario: true } }
                    }
                });

                // Lógica de notificação baseada no tipo de remetente
                const destinatarios: { id: number, email: string, nome: string }[] = [];

                if (remetente === "gestor") {
                    // Notifica solicitante se não for o gestor
                    if (
                        chamado?.idSolicitante &&
                        chamado.usuario_chamado_idSolicitanteTousuario &&
                        chamado.idSolicitante !== idRemetente
                    ) {
                        destinatarios.push({
                            id: chamado.idSolicitante,
                            email: chamado.usuario_chamado_idSolicitanteTousuario.email,
                            nome: chamado.usuario_chamado_idSolicitanteTousuario.nomeUsuario
                        });
                    }
                    // Notifica analista se não for o gestor
                    if (
                        chamado?.idAnalista &&
                        chamado.usuario_chamado_idAnalistaTousuario &&
                        chamado.idAnalista !== idRemetente
                    ) {
                        destinatarios.push({
                            id: chamado.idAnalista,
                            email: chamado.usuario_chamado_idAnalistaTousuario.email,
                            nome: chamado.usuario_chamado_idAnalistaTousuario.nomeUsuario
                        });
                    }
                } else if (remetente === "analista") {
                    if (
                        chamado?.idSolicitante &&
                        chamado.usuario_chamado_idSolicitanteTousuario
                    ) {
                        destinatarios.push({
                            id: chamado.idSolicitante,
                            email: chamado.usuario_chamado_idSolicitanteTousuario.email,
                            nome: chamado.usuario_chamado_idSolicitanteTousuario.nomeUsuario
                        });
                    }
                } else if (remetente === "usuario") {
                    if (
                        chamado?.idAnalista &&
                        chamado.usuario_chamado_idAnalistaTousuario
                    ) {
                        destinatarios.push({
                            id: chamado.idAnalista,
                            email: chamado.usuario_chamado_idAnalistaTousuario.email,
                            nome: chamado.usuario_chamado_idAnalistaTousuario.nomeUsuario
                        });
                    }
                }

                logger.info('ChatSocket', 'NOTIFICATION_TARGETS_IDENTIFIED', idRemetente, {
                    idChamado,
                    remetente,
                    destinatariosCount: destinatarios.length,
                    destinatariosInfo: JSON.stringify(destinatarios.map(d => ({ id: d.id, nome: d.nome })))
                });

                // Para cada destinatário, verifica se está na sala e envia notificação/email se não estiver
                for (const destinatario of destinatarios) {
                    // Verifica se o destinatário está na sala do chamado
                    let destinatarioNaSala = false;
                    const room = io.sockets.adapter.rooms.get(`chamado_${idChamado}`);
                    if (room) {
                        for (const socketId of room) {
                            const s = io.sockets.sockets.get(socketId);
                            if (s && s.data && s.data.userId === destinatario.id) {
                                destinatarioNaSala = true;
                                break;
                            }
                        }
                    }

                    if (!destinatarioNaSala) {
                        // Log único consolidado para notificação offline
                        logger.info('ChatSocket', 'OFFLINE_USER_NOTIFICATION', idRemetente, {
                            targetUserId: destinatario.id,
                            targetUserName: destinatario.nome,
                            idChamado,
                            notificationType: 'email_and_database'
                        });

                        (async () => {
                            try {
                                await notificationService.createNotification({
                                    titulo: "Nova mensagem no chamado",
                                    mensagem: mensagem,
                                    idUsuario: destinatario.id,
                                    idChamado,
                                });

                                await sendNotificationEmail({
                                    to: destinatario.email,
                                    nomeUsuario: destinatario.nome || "Usuário",
                                    idChamado,
                                    assunto: chamado?.assunto || "",
                                    mensagem,
                                });

                            } catch (err) {
                                logger.error('ChatSocket', 'NOTIFICATION_SEND_ERROR', idRemetente, err as Error);
                            }
                        })();
                    } else {
                        logger.info('ChatSocket', 'USER_ONLINE_NO_NOTIFICATION_NEEDED', idRemetente, {
                            targetUserId: destinatario.id,
                            idChamado
                        });
                    }
                }

            } catch (err) {
                logger.error('ChatSocket', 'CHAT_MESSAGE_ERROR', idRemetente, err as Error);
                socket.emit("chat:error", { error: "Erro ao salvar mensagem.", err });
            }
        });

        socket.on("disconnect", () => {
            const userId = socket.data?.userId;
            logger.info('ChatSocket', 'SOCKET_DISCONNECT', userId, {
                socketId: socket.id,
                userId: userId || 'unknown'
            });
        });
    });
}

/*
- O frontend conecta ao socket.io e emite "joinChamado" com idChamado e idUsuario.
- O backend valida se o usuário pode acessar o chat do chamado (solicitante, analista ou gestor).
- Se permitido, o usuário entra na sala do chamado (socket.join).
- Quando uma mensagem é enviada ("chat:send"):
    - Ela é persistida no banco via ChatService.
    - É emitida para todos na sala do chamado ("chat:receive").
    - Se o destinatário não estiver na sala, o backend salva uma notificação no banco e envia um e-mail de notificação para o destinatário.
- As mensagens podem ser buscadas via REST GET /chats/:idChamado/messages para exibir o histórico ao abrir o chat.
- As notificações podem ser consultadas via endpoint de notificações.
*/
