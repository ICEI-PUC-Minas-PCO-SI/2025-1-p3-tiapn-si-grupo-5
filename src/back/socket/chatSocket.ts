import { Server, Socket } from "socket.io";
import { ticketService } from "../controllers/ticketController";

export function registerChatSocket(io: Server) {
    io.on("connection", (socket: Socket) => {
        console.log("Novo cliente conectado:", socket.id);

        socket.on("joinChamado", ({ idChamado, idUsuario }) => {
            socket.join(`chamado_${idChamado}`);
            console.log(`Usuário ${idUsuario} entrou na sala chamado_${idChamado}`);
        });

        socket.on("chat:send", async (data) => {
            try {
                const { idChamado, idRemetente, mensagem, remetente, urlAnexo, nomeArquivo } = data;
                // Salva mensagem no banco
                const msg = await ticketService.createChatMessage(
                    idChamado,
                    idRemetente,
                    mensagem,
                    remetente,
                    urlAnexo,
                    nomeArquivo
                );
                // Busque dados do usuário remetente se necessário
                // Envie para todos na sala
                io.to(`chamado_${idChamado}`).emit("chat:receive", {
                    ...msg,
                    usuario: undefined // ou busque dados do usuário se necessário
                });
            } catch (error) {
                socket.emit("chat:error", { error: "Erro ao enviar mensagem" });
                console.error("Erro ao enviar mensagem:", error);
            }
        });

        socket.on("disconnect", () => {
            console.log("Cliente desconectado:", socket.id);
        });
    });
}