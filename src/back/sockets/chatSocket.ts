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
    remetente: "usuario" | "analista";
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
            console.log(`[SOCKET] chat:send recebido:`, data);
            try {
                const { idChamado, idRemetente, mensagem, remetente, urlAnexo, nomeArquivo } = data;
                if (!idChamado || !idRemetente || !mensagem || !remetente) {
                    console.log(`[SOCKET] chat:send faltando dados`);
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

                // Descobre o destinatário (analista ou solicitante)
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

                let destinatarioId: number | undefined;
                let destinatarioEmail: string | undefined;
                let destinatarioNome: string | undefined;

                if (remetente === "usuario" && chamado?.idAnalista && chamado.usuario_chamado_idAnalistaTousuario) {
                    destinatarioId = chamado.idAnalista;
                    destinatarioEmail = chamado.usuario_chamado_idAnalistaTousuario.email;
                    destinatarioNome = chamado.usuario_chamado_idAnalistaTousuario.nomeUsuario;
                } else if (remetente === "analista" && chamado?.idSolicitante && chamado.usuario_chamado_idSolicitanteTousuario) {
                    destinatarioId = chamado.idSolicitante;
                    destinatarioEmail = chamado.usuario_chamado_idSolicitanteTousuario.email;
                    destinatarioNome = chamado.usuario_chamado_idSolicitanteTousuario.nomeUsuario;
                }

                // Verifica se o destinatário está na sala do chamado (agora usando socket.data.userId)
                let destinatarioNaSala = false;
                if (destinatarioId) {
                    const room = io.sockets.adapter.rooms.get(`chamado_${idChamado}`);
                    if (room) {
                        for (const socketId of room) {
                            const s = io.sockets.sockets.get(socketId);
                            if (s && s.data && s.data.userId === destinatarioId) {
                                destinatarioNaSala = true;
                                break;
                            }
                        }
                    }
                }

                // Se o destinatário NÃO está na sala, envia notificação e e-mail (em background, não await)
                if (destinatarioId && destinatarioEmail && !destinatarioNaSala) {
                    (async () => {
                        try {
                            await notificationService.createNotification({
                                titulo: "Nova mensagem no chamado",
                                mensagem: mensagem,
                                idUsuario: destinatarioId,
                                idChamado,
                            });
                            await sendNotificationEmail({
                                to: destinatarioEmail,
                                nomeUsuario: destinatarioNome || "Usuário",
                                idChamado,
                                assunto: chamado?.assunto || "",
                                mensagem,
                            });
                        } catch (err) {
                            console.error("[SOCKET] Erro ao enviar notificação/e-mail:", err);
                        }
                    })();
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
