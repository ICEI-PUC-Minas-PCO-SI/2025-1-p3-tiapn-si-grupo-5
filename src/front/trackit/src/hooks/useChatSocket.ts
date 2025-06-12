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

    useEffect(() => {
        const socket = io(SOCKET_URL);
        socketRef.current = socket;

        socket.on("chat:receive", onReceive);
        if (onError) socket.on("chat:error", onError);

        socket.on("connect_error", (err) => {
            if (onError) onError({ error: "Erro ao conectar ao chat em tempo real", ...err });
        });

        return () => {
            socket.disconnect();
        };
    }, [onReceive, onError]);

    return socketRef;
}
