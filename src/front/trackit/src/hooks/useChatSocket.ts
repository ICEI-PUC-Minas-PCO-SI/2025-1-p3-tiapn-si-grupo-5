import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";

export interface ChatMessage {
    idMensagem: number;
    mensagem: string;
    timestamp: string;
    remetente: "usuario" | "analista";
    idRemetente: number;
    urlAnexo?: string | null;
    nomeArquivo?: string | null;
}

export function useChatSocket(
    onReceive: (msg: ChatMessage) => void,
    onError?: (err: { error: string;[key: string]: unknown }) => void
) {
    const socketRef = useRef<Socket | null>(null);

    // Cria o socket apenas uma vez
    useEffect(() => {
        const socket = io(SOCKET_URL);
        socketRef.current = socket;

        return () => {
            socket.disconnect();
        };
    }, []);

    // Atualiza listeners quando as funções mudam
    useEffect(() => {
        const socket = socketRef.current;
        if (!socket) return;

        if (onReceive) {
            socket.on("chat:receive", onReceive);
        }
        if (onError) {
            socket.on("chat:error", onError);
            socket.on("connect_error", (err) => {
                onError({ error: "Erro ao conectar ao chat em tempo real", ...err });
            });
        }

        // Cleanup apenas dos listeners, não do socket inteiro
        return () => {
            if (onReceive) socket.off("chat:receive", onReceive);
            if (onError) {
                socket.off("chat:error", onError);
                socket.off("connect_error");
            }
        };
    }, [onReceive, onError]);

    return socketRef;
}
