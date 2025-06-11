import { App } from "./app";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { setupChatSocket } from "./sockets/chatSocket";

const PORT = process.env.PORT || 3000;

const appInstance = new App().getInstance();
const server = http.createServer(appInstance);

const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Inicializa o chat em tempo real
setupChatSocket(io);

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
