/* Hook useChatSocket: gerencia a conexão com o socket.io para o chat em tempo real.
Cria a conexão apenas uma vez, adiciona/remove listeners conforme as funções recebidas por parâmetro.
Retorna uma ref para o socket para ser usada no componente Chat.tsx */

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import type { ChatMessage } from "@/api/chat";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export function useChatSocket(
    onReceive: (msg: ChatMessage) => void,
    onError?: (err: { error: string;[key: string]: unknown }) => void,
    onJoined?: (data: { idChamado: number }) => void
) {
    // Ref para manter a instância do socket entre renders
    const socketRef = useRef<Socket | null>(null);

    // Cria o socket apenas uma vez ao montar o componente
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

        // Listener para receber mensagens do chat
        if (onReceive) {
            socket.on("chat:receive", onReceive);
        }
        // Listener para erros do chat
        if (onError) {
            socket.on("chat:error", onError);
            socket.on("connect_error", (err) => {
                onError({ error: "Erro ao conectar ao chat em tempo real", ...err });
            });
        }
        // Listener para quando o usuário entra na sala do chamado
        if (onJoined) {
            socket.on("chat:joined", onJoined);
        }

        // Remove listeners ao desmontar ou atualizar dependências
        return () => {
            if (onReceive) socket.off("chat:receive", onReceive);
            if (onError) {
                socket.off("chat:error", onError);
                socket.off("connect_error");
            }
            if (onJoined) socket.off("chat:joined", onJoined);
        };
    }, [onReceive, onError, onJoined]);

    // Retorna a ref do socket para uso externo
    return socketRef;
}
