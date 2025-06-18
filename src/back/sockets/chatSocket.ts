import { Server as SocketIOServer, Socket } from "socket.io";
import { PrismaClient } from "../generated/prisma";
import { ChatService } from "../services/chatService";
import { sendNotificationEmail } from "../services/emailServices";
import { NotificationService } from "../services/notificationService";

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
        console.log(`[SOCKET] Nova conexão: ${socket.id}`);

        // Usuário entra em uma sala específica (ex: por idUsuario)
        socket.on("join", (userId: number) => {
            console.log(`[SOCKET] join recebido: userId=${userId}`);
            if (userId) socket.join(`user_${userId}`);
        });

        // Usuário tenta entrar em uma sala de chamado
        socket.on("joinChamado", async (data: JoinChamadoData) => {
            console.log(`[SOCKET] joinChamado recebido:`, data);
            const { idChamado, idUsuario } = data || {};
            if (!idChamado || !idUsuario) {
                console.log(`[SOCKET] joinChamado faltando dados: idChamado=${idChamado}, idUsuario=${idUsuario}`);
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

                console.log(`[SOCKET] joinChamado chamado=`, chamado, "usuario=", usuario);

                if (!chamado || !usuario) {
                    console.log(`[SOCKET] joinChamado chamado ou usuario não encontrado`);
                    socket.emit("chat:error", { error: "Chamado ou usuário não encontrado." });
                    return;
                }

                // REMOVA O BLOQUEIO ABAIXO:
                // const isSolicitante = chamado.idSolicitante === idUsuario;
                // const isAnalista = chamado.idAnalista === idUsuario;
                // const isGestor = usuario.idTipoUsuario === 1;

                // if (isSolicitante || isAnalista || isGestor) {
                socket.join(`chamado_${idChamado}`);
                // Salva o userId no socket para detecção correta depois
                socket.data.userId = idUsuario;
                console.log(`[SOCKET] Usuário ${idUsuario} entrou na sala chamado_${idChamado}`);
                socket.emit("chat:joined", { idChamado });

                // Marcar notificações pendentes desse chamado como lidas para o usuário
                await notificationService.markAllAsReadForChamado(idUsuario, idChamado);

                // } else {
                //     console.log(`[SOCKET] Usuário ${idUsuario} não tem permissão para chamado_${idChamado}`);
                //     socket.emit("chat:error", { error: "Você não tem permissão para acessar este chat." });
                // }
            } catch (err) {
                console.log(`[SOCKET] Erro ao validar permissão para entrar na sala do chamado:`, err);
                socket.emit("chat:error", { error: "Erro ao validar permissão para entrar na sala do chamado.", err });
            }
        });

        socket.on("chat:send", async (data: ChatSendData) => {
            console.log("[BACK][SOCKET] Evento chat:send recebido:", data);
            try {
                const { idChamado, idRemetente, mensagem, remetente, urlAnexo, nomeArquivo } = data;
                // Log para debug do remetente recebido
                console.log("[BACK][SOCKET] remetente recebido:", remetente, "idRemetente:", idRemetente);

                if (!idChamado || !idRemetente || !mensagem || !remetente) {
                    console.log(`[SOCKET] chat:send faltando dados`);
                    socket.emit("chat:error", { error: "Dados obrigatórios ausentes." });
                    return;
                }

                // Salva no banco usando o ChatService (agora aceita gestor)
                const novaMensagem = await chatService.saveMessage({
                    idChamado,
                    idRemetente,
                    mensagem,
                    remetente,
                    urlAnexo,
                    nomeArquivo,
                });

                // Busca a mensagem recém-criada com join do usuário (igual ao REST)
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

                // Envia para todos na sala do chamado IMEDIATAMENTE (sem aguardar notificação)
                io.to(`chamado_${idChamado}`).emit("chat:receive", mensagemCompleta);

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

                // Lógica de notificação:
                // Se gestor envia, notifica todos os outros (analista e solicitante), exceto o gestor
                // Se analista envia, notifica solicitante
                // Se solicitante envia, notifica analista

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
                    // Adicione este log:
                    console.log("[SOCKET][DEBUG] Destinatários para gestor:", destinatarios);
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
                        console.log(`[SOCKET][NOTIF] Criando notificação para idUsuario=${destinatario.id} (remetente=${remetente})`);
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
                                console.error("[SOCKET] Erro ao enviar notificação/e-mail:", err);
                            }
                        })();
                    }
                }

                console.log(`[SOCKET] Mensagem salva e emitida para chamado_${idChamado}:`, mensagemCompleta);

            } catch (err) {
                console.log(`[SOCKET] Erro ao salvar mensagem:`, err);
                socket.emit("chat:error", { error: "Erro ao salvar mensagem.", err });
            }
        });

        socket.on("disconnect", () => {
            console.log(`[SOCKET] Desconectado: ${socket.id}`);
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
