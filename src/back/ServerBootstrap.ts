import { App } from "./app";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { setupChatSocket } from "./sockets/ChatSocket";

export class ServerBootstrap {
    private port: number | string;
    private server: http.Server;
    private io: SocketIOServer;

    constructor(port: number | string) {
        this.port = port;
        const appInstance = new App().getInstance();
        this.server = http.createServer(appInstance);
        this.io = new SocketIOServer(this.server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
                credentials: true
            }
        });
        setupChatSocket(this.io);
    }

    public start() {
        this.server.listen(this.port, () => {
            console.log("Servidor rodando!");
        });
    }
}
