import { Server as SocketIOServer, Socket } from "socket.io";
import { PrismaClient } from "../generated/prisma";
import { ChatService } from "../services/chatService";

const prisma = new PrismaClient();
const chatService = new ChatService();

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

        // Recebe mensagem e persiste no banco
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

                console.log(`[SOCKET] Mensagem salva e emitida para chamado_${idChamado}:`, mensagemCompleta);

                // Envia para todos na sala do chamado
                io.to(`chamado_${idChamado}`).emit("chat:receive", mensagemCompleta);
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
- Quando uma mensagem é enviada ("chat:send"), ela é persistida no banco via ChatService e emitida para todos na sala do chamado ("chat:receive").
- As mensagens podem ser buscadas via REST GET /chats/:idChamado/messages para exibir o histórico ao abrir o chat.
*/
