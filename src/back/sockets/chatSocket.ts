import { Server as SocketIOServer, Socket } from "socket.io";
import { PrismaClient, msgchamado_remetente } from "../generated/prisma";

const prisma = new PrismaClient();

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
                socket.emit("chat:error", { error: "Erro ao validar permissão para entrar na sala do chamado.", err});
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

                // Salva no banco
                const novaMensagem = await prisma.msgchamado.create({
                    data: {
                        idChamado,
                        idRemetente,
                        mensagem,
                        remetente: remetente as msgchamado_remetente,
                        urlAnexo: urlAnexo || null,
                        nomeArquivo: nomeArquivo || null,
                    },
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
