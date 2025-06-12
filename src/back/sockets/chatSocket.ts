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
        // Usuário entra em uma sala específica (ex: por idUsuario)
        socket.on("join", (userId: number) => {
            if (userId) socket.join(`user_${userId}`);
        });

        // Usuário tenta entrar em uma sala de chamado
        socket.on("joinChamado", async (data: JoinChamadoData) => {
            const { idChamado, idUsuario } = data || {};
            if (!idChamado || !idUsuario) {
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
                    socket.emit("chat:error", { error: "Chamado ou usuário não encontrado." });
                    return;
                }

                // Apenas solicitantes e analistas envolvidos na demanda ou gestores terão acesso ao chat.
                const isSolicitante = chamado.idSolicitante === idUsuario;
                const isAnalista = chamado.idAnalista === idUsuario;
                const isGestor = usuario.idTipoUsuario === 1;

                if (isSolicitante || isAnalista || isGestor) {
                    socket.join(`chamado_${idChamado}`);
                    socket.emit("chat:joined", { idChamado });
                } else {
                    socket.emit("chat:error", { error: "Você não tem permissão para acessar este chat." });
                }
            } catch (err) {
                socket.emit("chat:error", { error: "Erro ao validar permissão para entrar na sala do chamado.", err });
            }
        });

        // Recebe mensagem e persiste no banco
        socket.on("chat:send", async (data: ChatSendData) => {
            try {
                const { idChamado, idRemetente, mensagem, remetente, urlAnexo, nomeArquivo } = data;
                if (!idChamado || !idRemetente || !mensagem || !remetente) {
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

                // Envia para todos na sala do chamado
                io.to(`chamado_${idChamado}`).emit("chat:receive", novaMensagem);
            } catch (err) {
                socket.emit("chat:error", { error: "Erro ao salvar mensagem.", err });
            }
        });

        socket.on("disconnect", () => {
            // Cleanup se necessário
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
