import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Send, ChevronsRight, ChevronsLeft } from "lucide-react";
import { Message } from "@/components/ui/Message";
import { useUser } from "@/contexts/UserContext";
import { useChatSocket } from "@/hooks/useChatSocket";
import type { ChatMessage } from "@/hooks/useChatSocket";
import { getChatMessages } from "@/api/chat";

interface ChatProps {
    descricao: string;
}

export default function Chat({ descricao }: ChatProps) {
    const { user } = useUser();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [showDescricao, setShowDescricao] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Pega o idChamado da URL
    const searchParams = new URLSearchParams(window.location.search);
    const idChamado = Number(searchParams.get("idChamado"));

    // Buscar histórico ao abrir (apenas uma vez por idChamado)
    useEffect(() => {
        setLoading(true);
        setError(null);
        console.log("[CHAT] Buscando histórico de mensagens para chamado", idChamado);
        getChatMessages(idChamado)
            .then(data => {
                console.log("[CHAT] Mensagens carregadas:", data);
                setMessages(data);
            })
            .catch(err => {
                console.error("[CHAT] Erro ao buscar mensagens:", err);
                setMessages([]);
                setError(err.message || "Erro ao buscar mensagens");
            })
            .finally(() => setLoading(false));
    }, [idChamado]);

    // Conectar ao socket
    const socketRef = useChatSocket(
        (msg: ChatMessage) => {
            console.log("[CHAT] Mensagem recebida via socket:", msg);
            setMessages(prev => {
                // Evita duplicatas por idMensagem
                if (!msg.idMensagem) {
                    console.warn("[CHAT] Mensagem recebida sem idMensagem:", msg);
                }
                if (prev.some(m => m.idMensagem === msg.idMensagem)) {
                    console.log("[CHAT] Mensagem duplicada, não adicionando.");
                    return prev;
                }
                const novoArray = [...prev, msg];
                console.log("[CHAT] Mensagens depois de adicionar:", novoArray);
                return novoArray;
            });
        },
        (err) => {
            console.error("[CHAT] Erro no chat em tempo real:", err);
            setError(err.error || "Erro no chat em tempo real");
        }
    );

    // Entrar na sala do chamado
    useEffect(() => {
        if (!user || !socketRef.current) {
            console.log("[CHAT] Esperando user e socketRef estarem prontos...", { user, socket: socketRef.current });
            return;
        }

        const socket = socketRef.current; // Salva a referência atual

        socket.off("chat:joined");
        socket.off("chat:error");
        socket.off("disconnect");

        socket.on("chat:joined", (data) => {
            console.log("[CHAT] Recebido chat:joined no frontend", data);
        });
        socket.on("chat:error", (err) => {
            console.error("[CHAT] Recebido chat:error no frontend", err);
            setError(err.error || "Erro ao entrar no chat");
        });
        socket.on("disconnect", () => {
            console.warn("[CHAT] Socket desconectado no frontend");
        });

        console.log("[CHAT] Emitindo joinChamado", { idChamado, idUsuario: user.id });
        socket.emit("joinChamado", {
            idChamado,
            idUsuario: user.id,
        });

        return () => {
            if (socket) {
                socket.off("chat:joined");
                socket.off("chat:error");
                socket.off("disconnect");
            }
        };
    }, [idChamado, user, socketRef]);

    // Enviar mensagem
    function handleSend(e: FormEvent) {
        e.preventDefault();
        if (!input.trim() || !user || !socketRef.current) return;
        console.log("[CHAT] Enviando mensagem via socket:", {
            idChamado,
            idRemetente: user.id,
            mensagem: input,
            remetente: user.tipo === 2 ? "analista" : "usuario",
        });
        socketRef.current.emit("chat:send", {
            idChamado,
            idRemetente: user.id,
            mensagem: input,
            remetente: user.tipo === 2 ? "analista" : "usuario",
        });
        setInput("");
    }

    return (
        <div className="flex flex-col w-full mx-auto border rounded bg-white min-h-[600px]">
            {/* Header com botão retração */}
            <div className="flex items-center justify-between border-b px-4 py-2">
                <span className="font-semibold text-base">Chat</span>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Retrair/Expandir"
                    onClick={() => setShowDescricao((v) => !v)}
                >
                    {showDescricao ? <ChevronsLeft /> : <ChevronsRight />}
                </Button>
            </div>
            <div className="min-h-[520px] w-full flex">
                <div className={`transition-all duration-400 ${showDescricao ? "w-1/2 border-r" : "w-full"}`}>
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="flex flex-col gap-6">
                            {loading ? (
                                <span className="text-center text-slate-500">Carregando mensagens...</span>
                            ) : error ? (
                                <span className="text-center text-red-500">{error}</span>
                            ) : (
                                messages.map((msg) => (
                                    <Message
                                        key={msg.idMensagem}
                                        user={msg.remetente}
                                        time={msg.timestamp}
                                        text={msg.mensagem}
                                        isCurrentUser={msg.idRemetente === user?.id}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
                {/* Conteúdo da descrição */}
                {showDescricao && (
                    <div className="flex flex-col bg-white w-1/2 min-w-[240px] max-w-[50vw] overflow-hidden">
                        <div className="flex items-center justify-between border-b px-4 py-2">
                            <span className="font-semibold text-base">Descrição da demanda</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setShowDescricao(false)}
                                aria-label="Ocultar descrição"
                            />
                        </div>
                        <div className="flex-1 p-6 overflow-y-auto" style={{ height: "520px" }}>
                            <div className="whitespace-pre-line text-slate-900 text-sm">
                                {descricao}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <form className="flex items-end gap-2 border-t px-4 py-3 bg-white" onSubmit={handleSend}>
                <Button className="h-11" type="button" variant="outlineDisabled" size="icon" disabled>
                    <Paperclip className="w-5 h-5" />
                </Button>
                <Textarea
                    className="resize-none min-h-[44px] max-h-32 flex-1"
                    placeholder="Digite sua mensagem..."
                    rows={1}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <Button
                    type="submit"
                    className="h-11 w-11 p-0 rounded-full"
                    variant="default"
                >
                    <Send className="w-5 h-5" />
                </Button>
            </form>
        </div>
    );
}
