/* Componente Chat: exibe o chat de um chamado, histórico de mensagens, envia mensagens e integra com socket.io para chat em tempo real. */
import { useEffect, useState, useRef } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Send, ChevronsRight, ChevronsLeft } from "lucide-react";
import { Message } from "@/components/ui/Message";
import { useUser } from "@/contexts/UserContext";
import { useChatSocket } from "@/hooks/useChatSocket";
import type { ChatMessage } from "@/api/chat";
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

    // Obtém o idChamado da URL
    const searchParams = new URLSearchParams(window.location.search);
    const idChamado = Number(searchParams.get("idChamado"));

    // Busca o histórico de mensagens ao abrir o chat
    useEffect(() => {
        setLoading(true);
        setError(null);
        // Busca as mensagens do chamado via API REST
        getChatMessages(idChamado)
            .then(data => {
                setMessages(data);
            })
            .catch(err => {
                setMessages([]);
                setError(err.message || "Erro ao buscar mensagens");
            })
            .finally(() => setLoading(false));
    }, [idChamado]);

    // Hook customizado para conectar ao socket.io e receber mensagens em tempo real
    const socketRef = useChatSocket(
        (msg: ChatMessage) => {
            // Adiciona mensagem recebida via socket ao estado, evitando duplicatas
            setMessages(prev => {
                if (!msg.idMensagem) {
                    // Mensagem sem idMensagem não é adicionada
                }
                if (prev.some(m => m.idMensagem === msg.idMensagem)) {
                    return prev;
                }
                return [...prev, msg];
            });
        },
        (err) => {
            setError(err.error || "Erro no chat em tempo real");
        }
    );

    // Entra na sala do chamado no socket ao montar o componente
    useEffect(() => {
        if (!user || !socketRef.current) {
            return;
        }

        const socket = socketRef.current;

        // Remove listeners antigos para evitar múltiplos handlers
        socket.off("chat:joined");
        socket.off("chat:error");
        socket.off("disconnect");

        // Listener de erro ao entrar na sala
        socket.on("chat:error", (err) => {
            setError(err.error || "Erro ao entrar no chat");
        });

        // Listener de desconexão do socket
        socket.on("disconnect", () => {
            // Apenas loga/desabilita recursos se necessário
        });

        // Entra na sala do chamado
        socket.emit("joinChamado", {
            idChamado,
            idUsuario: user.id,
        });

        // Cleanup dos listeners ao desmontar
        return () => {
            if (socket) {
                socket.off("chat:joined");
                socket.off("chat:error");
                socket.off("disconnect");
            }
        };
    }, [idChamado, user, socketRef]);

    // Envia mensagem para o socket e limpa o input
    function handleSend(e: FormEvent) {
        e.preventDefault();
        if (!input.trim() || !user || !socketRef.current) return;

        let remetente: "usuario" | "analista" | "gestor" = "usuario";
        const tipo = user.idTipoUsuario ?? user.tipo;
        if (tipo === 1) {
            remetente = "gestor";
        } else if (tipo === 2) {
            remetente = "analista";
        } else {
            remetente = "usuario";
        }

        socketRef.current.emit("chat:send", {
            idChamado,
            idRemetente: user.id,
            mensagem: input,
            remetente,
        });
        setInput("");
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }

    // Formata o timestamp da mensagem para o horário brasileiro, mostrando data se necessário
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

    // Ref para scroll automático ao final das mensagens
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    // Ref para o textarea (input de mensagem)
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // Sempre que as mensagens mudam, faz scroll para o final
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    /* handler para enviar ao pressionar Enter (sem Shift) e quebra de linha ao pressionar Tab 
    
    esse comportamento pode ser mudado posteriormente caso a ux nao seja a esperada
    */
    function handleInputKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter" && !e.shiftKey && !e.altKey && !e.ctrlKey) {
            e.preventDefault();
            handleSend(e as unknown as FormEvent);
        } else if (e.key === "Tab") {
            e.preventDefault();
            const textarea = textareaRef.current;
            if (textarea) {
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const value = textarea.value;
                // Insere uma quebra de linha na posição do cursor
                const newValue = value.substring(0, start) + "\n" + value.substring(end);
                setInput(newValue);
                // Atualiza o cursor para depois da quebra de linha
                setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd = start + 1;
                }, 0);
            }
        }
    }

    // Renderização do componente
    return (
        <div className="flex flex-col w-full mx-auto border rounded bg-white h-[600px] dark:bg-slate-900 dark:border-slate-800">
            {/* Header com botão retração */}
            <div className="flex items-center justify-between border-b px-4 py-2 dark:border-slate-800 dark:bg-slate-900">
                <span className="font-semibold text-base dark:text-white">Chat</span>
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
                <div className={`transition-all duration-400 ${showDescricao ? "w-1/2 border-r" : "w-full"} flex flex-col h-full dark:border-slate-800`}>
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="flex flex-col gap-6">
                            {loading ? (
                                <span className="text-center text-slate-500 dark:text-slate-300">Carregando mensagens...</span>
                            ) : error ? (
                                <span className="text-center text-red-500">{error}</span>
                            ) : (
                                <>
                                    {messages.map((msg) => {
                                        let nome = "Desconhecido";
                                        let gerencia = "";
                                        let avatarImg = undefined;
                                        // Se for o usuário logado, usa dados do contexto
                                        if (msg.idRemetente === user?.id) {
                                            nome = user?.nome || "Desconhecido";
                                            gerencia = user?.nomeGerencia || "";
                                            avatarImg = user?.fotoPerfil;
                                        } else if (msg.usuario) {
                                            // Para outros remetentes, usa dados vindos do backend
                                            nome = msg.usuario.nomeUsuario || "Desconhecido";
                                            gerencia = msg.usuario.gerencia?.nomeGerencia || "";
                                            avatarImg = msg.usuario.fotoPerfil || undefined;
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
                    <div className="flex flex-col bg-white w-1/2 min-w-[240px] max-w-[50vw] overflow-hidden h-full dark:bg-slate-900 dark:border-slate-800">
                        <div className="flex items-center justify-between border-b px-4 py-2 dark:border-slate-800 dark:bg-slate-900">
                            <span className="font-semibold text-base dark:text-white">Descrição da demanda</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setShowDescricao(false)}
                                aria-label="Ocultar descrição"
                            />
                        </div>
                        <div className="flex-1 p-6 overflow-y-auto">
                            <div className="whitespace-pre-line text-slate-900 text-sm dark:text-slate-200">
                                {descricao}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <form className="flex items-end gap-2 border-t px-4 py-3 bg-white dark:bg-slate-900 dark:border-slate-800" onSubmit={handleSend}>
                <Button className="h-11" type="button" variant="outlineDisabled" size="icon" disabled>
                    <Paperclip className="w-5 h-5" />
                </Button>
                <Textarea
                    className="resize-none min-h-[44px] max-h-32 flex-1 dark:bg-slate-800 dark:text-slate-200"
                    placeholder="Digite sua mensagem..."
                    rows={1}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    ref={textareaRef}
                    onKeyDown={handleInputKeyDown}
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
