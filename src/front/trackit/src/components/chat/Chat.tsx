import { useEffect, useState, useRef } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Send, ChevronsRight, ChevronsLeft } from "lucide-react";
import { Message } from "@/components/ui/Message";
import { useUser } from "@/contexts/UserContext";
import { useChatSocket } from "@/hooks/useChatSocket";
import type { ChatMessage } from "@/hooks/useChatSocket";
import { getChatMessages } from "@/api/chat";
import { getTicketById } from "@/api/ticket";
import type { ITicketFull } from "@/api/ticket";

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

    // Novo estado para dados do ticket
    const [ticketInfo, setTicketInfo] = useState<ITicketFull | null>(null);

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

    // Buscar ticket ao abrir (para pegar dados do solicitante e analista)
    useEffect(() => {
        getTicketById(idChamado)
            .then(setTicketInfo)
            .catch(() => setTicketInfo(null));
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

        const socket = socketRef.current;

        socket.off("chat:joined");
        socket.off("chat:error");
        socket.off("disconnect");

        /* socket.on("chat:joined", (data) => {
            console.log("[CHAT] Recebido chat:joined no frontend", data);
        }); */

        socket.on("chat:error", (err) => {
            console.error("[CHAT] Recebido chat:error no frontend", err);
            setError(err.error || "Erro ao entrar no chat");
        });

        socket.on("disconnect", () => {
            console.warn("[CHAT] Socket desconectado no frontend");
        });

        /* console.log("[CHAT] Emitindo joinChamado", { idChamado, idUsuario: user.id }); */

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
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }

    function formatToBrazilTime(isoString: string) {
        const date = new Date(isoString);
        const now = new Date();
        const isToday =
            date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear();
        const isCurrentYear = date.getFullYear() === now.getFullYear();

        const time = date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
        if (isToday) {
            return time;
        } else if (isCurrentYear) {
            const day = date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
            return `${day} às ${time}`;
        } else {
            const day = date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
            return `${day} às ${time}`;
        }
    }

    // Ref para a div de mensagens
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    // Ref para o textarea
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // Scroll automático para o final ao adicionar mensagem
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="flex flex-col w-full mx-auto border rounded bg-white h-[600px]">
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
            <div className="flex w-full flex-1 min-h-0">
                <div className={`transition-all duration-400 ${showDescricao ? "w-1/2 border-r" : "w-full"} flex flex-col h-full`}>
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="flex flex-col gap-6">
                            {loading ? (
                                <span className="text-center text-slate-500">Carregando mensagens...</span>
                            ) : error ? (
                                <span className="text-center text-red-500">{error}</span>
                            ) : (
                                <>
                                    {messages.map((msg) => {
                                        let nome = "Desconhecido";
                                        let gerencia = "";
                                        let avatarImg = undefined;

                                        // Se for o usuário atual
                                        if (msg.idRemetente === user?.id) {
                                            nome = user?.nome || "Desconhecido";
                                            gerencia = user?.nomeGerencia || "";
                                            avatarImg = user?.fotoPerfil;
                                        } else if (
                                            ticketInfo &&
                                            msg.idRemetente === ticketInfo.idSolicitante &&
                                            ticketInfo.usuario_chamado_idSolicitanteTousuario
                                        ) {
                                            // Se for o solicitante
                                            nome = ticketInfo.usuario_chamado_idSolicitanteTousuario.nomeUsuario;
                                            gerencia = ticketInfo.usuario_chamado_idSolicitanteTousuario.gerencia?.nomeGerencia || "";
                                        } else if (
                                            ticketInfo &&
                                            msg.idRemetente === ticketInfo.idAnalista &&
                                            ticketInfo.usuario_chamado_idAnalistaTousuario
                                        ) {
                                            // Se for o analista
                                            nome = ticketInfo.usuario_chamado_idAnalistaTousuario.nomeUsuario;
                                            gerencia = ticketInfo.usuario_chamado_idAnalistaTousuario.gerencia?.nomeGerencia || "";
                                        }

                                        return (
                                            <Message
                                                key={msg.idMensagem}
                                                nome={nome}
                                                gerencia={gerencia}
                                                horaFormatada={formatToBrazilTime(msg.timestamp)}
                                                text={msg.mensagem}
                                                isCurrentUser={msg.idRemetente === user?.id}
                                                avatarImg={avatarImg}
                                            />
                                        );
                                    })}
                                    <div ref={messagesEndRef} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
                {/* Conteúdo da descrição */}
                {showDescricao && (
                    <div className="flex flex-col bg-white w-1/2 min-w-[240px] max-w-[50vw] overflow-hidden h-full">
                        <div className="flex items-center justify-between border-b px-4 py-2">
                            <span className="font-semibold text-base">Descrição da demanda</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setShowDescricao(false)}
                                aria-label="Ocultar descrição"
                            />
                        </div>
                        <div className="flex-1 p-6 overflow-y-auto">
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
                    ref={textareaRef}
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
