/* Componente Chat: exibe o chat de um chamado, histórico de mensagens, envia mensagens e integra com socket.io para chat em tempo real. */
import { useEffect, useState, useRef } from "react";
import type { FormEvent } from "react";
import { Paperclip, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, ChevronsRight, ChevronsLeft } from "lucide-react";
import { Message } from "@/components/ui/Message";
import { useUser } from "@/contexts/UserContext";
import { useChatSocket } from "@/hooks/useChatSocket";
import type { ChatMessage } from "@/api/chat";
import { getChatMessages } from "@/api/chat";
import { markAllNotificationsAsRead } from "@/api/notifications";
import { getTicketByIdFull } from "@/api/ticket";
import { GlobalAlert } from "@/components/ui/GlobalAlert";
import { uploadFile } from "@/api/upload";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { z } from "zod";

interface ChatProps {
    descricao?: string;
    urlAnexo?: string | null;
    nomeArquivo?: string | null;
}

// Schema Zod para validação do dialog de anexo
const attachSchema = z.object({
    nomeArquivo: z.string()
        .min(3, "O nome do arquivo deve ter pelo menos 3 caracteres")
        .max(15, "O nome do arquivo deve ter no máximo 15 caracteres"),
    file: z.instanceof(File, { message: "Selecione um arquivo para anexar" })
});

export default function Chat(props: ChatProps) {
    const { user } = useUser();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [showDescricao, setShowDescricao] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [globalAlert, setGlobalAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogNomeArquivo, setDialogNomeArquivo] = useState("");
    const [dialogFile, setDialogFile] = useState<File | null>(null);
    const [dialogErrors, setDialogErrors] = useState<{ nomeArquivo?: string; file?: string }>({});
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    // Obtém o idChamado da URL
    const searchParams = new URLSearchParams(window.location.search);
    const idChamado = Number(searchParams.get("idChamado"));

    // Estado para dados do chamado
    const [ticketInfo, setTicketInfo] = useState<{ descricao: string; urlAnexo?: string | null; nomeArquivo?: string | null }>({
        descricao: props.descricao || "",
        urlAnexo: props.urlAnexo,
        nomeArquivo: props.nomeArquivo,
    });

    // Busca o chamado ao abrir o chat
    useEffect(() => {
        if (!idChamado) return;
        getTicketByIdFull(idChamado)
            .then(ticket => {
                setTicketInfo({
                    descricao: ticket.descricao,
                    urlAnexo: ticket.urlAnexo,
                    nomeArquivo: ticket.nomeArquivo,
                });
            })
            .catch(() => {
                setTicketInfo({
                    descricao: props.descricao || "",
                    urlAnexo: props.urlAnexo,
                    nomeArquivo: props.nomeArquivo,
                });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idChamado]);

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
        },
        async () => {
            // Evento disparado quando entrou na sala do chamado
            try {
                if (user && idChamado) {
                    await markAllNotificationsAsRead(user.id, idChamado);
                    // Dispara evento global para Sidebar atualizar badge
                    window.dispatchEvent(new Event("refresh-unread-notifications"));
                }
            } catch (e: unknown) {
                // Opcional: feedback de erro ao marcar notificações
                if (e instanceof Error) {
                    setError(e.message || "Erro ao marcar notificações como lidas");
                } else {
                    setError("Erro ao marcar notificações como lidas");
                }
            }
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

    // Handler para abrir dialog de anexo
    function handleAttachClick(e: React.MouseEvent) {
        e.preventDefault();
        setOpenDialog(true);
    }

    // Handler para selecionar arquivo no dialog
    function handleDialogFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            setDialogFile(e.target.files[0]);
        }
    }

    // Handler para anexar arquivo no dialog
    async function handleDialogAttach() {
        // Validação com Zod
        const result = attachSchema.safeParse({
            nomeArquivo: dialogNomeArquivo,
            file: dialogFile,
        });
        if (!result.success) {
            const errors: { nomeArquivo?: string; file?: string } = {};
            for (const err of result.error.errors) {
                if (err.path[0] === "nomeArquivo") errors.nomeArquivo = err.message;
                if (err.path[0] === "file") errors.file = err.message;
            }
            setDialogErrors(errors);
            return;
        }
        setDialogErrors({});

        setUploading(true);
        try {
            const resultUpload = await uploadFile(dialogFile!, undefined, setUploadProgress);
            setInput(prev => prev); // força rerender
            setAnexoUrl(resultUpload.url);
            setAnexoNome(dialogNomeArquivo || dialogFile!.name);
            setOpenDialog(false);
            setDialogNomeArquivo("");
            setDialogFile(null);
            setAnexoReady(true);
        } catch (error) {
            setGlobalAlert({ type: "error", message: "Erro ao anexar arquivo" });
            console.error("Erro ao fazer upload:", error);
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    }

    // Estados para armazenar url/nome do anexo após upload
    const [anexoUrl, setAnexoUrl] = useState<string | null>(null);
    const [anexoNome, setAnexoNome] = useState<string | null>(null);
    const [anexoReady, setAnexoReady] = useState(false); // novo estado para indicar pronto para envio

    // Atualize o handler de envio para resetar o estado de pronto após envio
    async function handleSend(e: FormEvent) {
        e.preventDefault();
        if (!input.trim()) return;
        if (!user || !socketRef.current) return;

        let remetente: "usuario" | "analista" | "gestor" = "usuario";
        const tipo = user.idTipoUsuario ?? user.tipo;
        if (tipo === 1) remetente = "gestor";
        else if (tipo === 2) remetente = "analista";

        socketRef.current.emit("chat:send", {
            idChamado,
            idRemetente: user.id,
            mensagem: input,
            remetente,
            urlAnexo: anexoUrl || undefined,
            nomeArquivo: anexoNome || undefined,
        });

        setInput("");
        setAnexoUrl(null);
        setAnexoNome(null);
        setAnexoReady(false); // reset após envio
        if (textareaRef.current) textareaRef.current.focus();
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
        <div className="flex flex-col w-full mx-auto border rounded bg-white h-[500px] md:h-[600px] dark:bg-slate-900 dark:border-slate-800">
            {/* Header com botão retração */}
            <div className="flex items-center justify-between border-b px-3 md:px-4 py-2 dark:border-slate-800 dark:bg-slate-900">
                <span className="font-semibold text-sm md:text-base dark:text-white">Chat</span>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Retrair/Expandir"
                    onClick={() => setShowDescricao((v) => !v)}
                    className="h-8 w-8 md:h-10 md:w-10 hidden md:flex"
                >
                    {showDescricao ? <ChevronsLeft className="h-4 w-4 md:h-5 md:w-5 " /> : <ChevronsRight className="h-4 w-4 md:h-5 md:w-5" />}
                </Button>
            </div>
            <div className="flex w-full flex-1 min-h-0">
                <div className={`transition-all duration-400 ${showDescricao ? "w-full md:w-1/2 md:border-r" : "w-full"} flex flex-col h-full dark:border-slate-800`}>
                    <div className="flex-1 overflow-y-auto p-3 md:p-6">
                        <div className="flex flex-col gap-4 md:gap-6">
                            {loading ? (
                                <span className="text-center text-slate-500 dark:text-slate-300 text-sm md:text-base">Carregando mensagens...</span>
                            ) : error ? (
                                <span className="text-center text-red-500 text-sm md:text-base">{error}</span>
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
                                            <div key={msg.idMensagem}>
                                                <div className="flex flex-col gap-2">
                                                    <Message
                                                        nome={nome}
                                                        gerencia={gerencia}
                                                        horaFormatada={formatToBrazilTime(msg.timestamp)}
                                                        text={msg.mensagem}
                                                        isCurrentUser={msg.idRemetente === user?.id}
                                                        avatarImg={avatarImg}
                                                        anexoUrl={msg.urlAnexo}
                                                        anexoNome={msg.nomeArquivo}
                                                        onDownloadAnexo={() =>
                                                            setGlobalAlert({ type: "error", message: "Erro ao baixar o arquivo." })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div ref={messagesEndRef} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
                {/* Conteúdo da descrição - Oculto no mobile quando showDescricao for true */}
                {showDescricao && (
                    <div className="hidden md:flex flex-col bg-white w-1/2 min-w-[240px] max-w-[50vw] overflow-hidden h-full dark:bg-slate-900 dark:border-slate-800">
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
                            <div className="whitespace-pre-line text-slate-900 text-sm dark:text-slate-200 mb-4">
                                {ticketInfo.descricao}
                            </div>
                            {ticketInfo.urlAnexo && ticketInfo.nomeArquivo && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="mt-4 flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors w-full"
                                    style={{ textDecoration: "none" }}
                                    onClick={async () => {
                                        try {
                                            const response = await fetch(ticketInfo.urlAnexo!);
                                            if (!response.ok) throw new Error("Erro ao baixar arquivo");
                                            const blob = await response.blob();
                                            const url = window.URL.createObjectURL(blob);
                                            const link = document.createElement("a");
                                            link.href = url;
                                            link.download = ticketInfo.nomeArquivo!;
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                            window.URL.revokeObjectURL(url);
                                        } catch (e) {
                                            setGlobalAlert({ type: "error", message: "Erro ao baixar o arquivo." });
                                            console.error("Erro ao baixar o arquivo:", e);
                                        }
                                    }}
                                >
                                    <div className="flex items-center gap-2 min-w-0">
                                        <Paperclip className="w-4 h-4 text-sky-700 dark:text-sky-400 flex-shrink-0" />
                                        <span className="font-medium text-slate-900 dark:text-slate-100 text-xs truncate">{ticketInfo.nomeArquivo}</span>
                                    </div>
                                    <Download className="w-4 h-4 flex-shrink-0" />
                                </Button>
                            )}
                        </div>
                    </div>
                )}
                {/* Modal overlay para descrição no mobile */}
                {showDescricao && (
                    <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
                        <div className="bg-white dark:bg-slate-900 w-full h-3/4 rounded-t-lg flex flex-col">
                            <div className="flex items-center justify-between border-b px-4 py-3 dark:border-slate-800">
                                <span className="font-semibold text-base dark:text-white">Descrição da demanda</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setShowDescricao(false)}
                                    aria-label="Ocultar descrição"
                                    className="h-8 w-8"
                                >
                                    <ChevronsLeft className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex-1 p-4 overflow-y-auto">
                                <div className="whitespace-pre-line text-slate-900 text-sm dark:text-slate-200 mb-4">
                                    {ticketInfo.descricao}
                                </div>
                                {ticketInfo.urlAnexo && ticketInfo.nomeArquivo && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="mt-4 flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors w-full"
                                        style={{ textDecoration: "none" }}
                                        onClick={async () => {
                                            try {
                                                const response = await fetch(ticketInfo.urlAnexo!);
                                                if (!response.ok) throw new Error("Erro ao baixar arquivo");
                                                const blob = await response.blob();
                                                const url = window.URL.createObjectURL(blob);
                                                const link = document.createElement("a");
                                                link.href = url;
                                                link.download = ticketInfo.nomeArquivo!;
                                                document.body.appendChild(link);
                                                link.click();
                                                document.body.removeChild(link);
                                                window.URL.revokeObjectURL(url);
                                            } catch (e) {
                                                setGlobalAlert({ type: "error", message: "Erro ao baixar o arquivo." });
                                                console.error("Erro ao baixar o arquivo:", e);
                                            }
                                        }}
                                    >
                                        <div className="flex items-center gap-2 min-w-0">
                                            <Paperclip className="w-4 h-4 text-sky-700 dark:text-sky-400 flex-shrink-0" />
                                            <span className="font-medium text-slate-900 dark:text-slate-100 text-sm truncate">{ticketInfo.nomeArquivo}</span>
                                        </div>
                                        <Download className="w-4 h-4 flex-shrink-0" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <form className="flex items-end gap-3 md:gap-4 border-t px-4 py-4 bg-white dark:bg-slate-900 dark:border-slate-800" onSubmit={handleSend}>
                {/* Botão de anexo que abre dialog */}
                <Button
                    className={`h-10 w-10 md:h-11 md:w-11 flex-shrink-0 ${anexoReady ? "bg-green-600 hover:bg-green-700 text-white border-green-700" : ""}`}
                    type="button"
                    variant={anexoUrl && !anexoReady ? "default" : "outline"}
                    size="icon"
                    onClick={handleAttachClick}
                    disabled={uploading}
                >
                    <Paperclip className="w-4 h-4 md:w-5 md:h-5" />
                </Button>

                <div className="flex-1 flex flex-col gap-1">
                    {/* Exibe nome do arquivo anexado apenas se NÃO estiver pronto para envio */}
                    {!anexoReady && anexoNome && (
                        <span className="text-xs text-sky-700 dark:text-sky-400 px-1 truncate max-w-full">
                            📎 {anexoNome}
                        </span>
                    )}
                    <Textarea
                        className="resize-none min-h-[40px] md:min-h-[44px] max-h-32 w-full dark:bg-slate-800 dark:text-slate-200 text-sm md:text-base"
                        placeholder="Digite sua mensagem..."
                        rows={1}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        ref={textareaRef}
                        onKeyDown={handleInputKeyDown}
                    />
                </div>

                <Button
                    type="submit"
                    size="icon"
                    variant="default"
                    className="h-10 w-10 md:h-11 md:w-11 flex-shrink-0"
                    disabled={!input.trim()}
                >
                    <Send className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
            </form>
            {/* Dialog de anexo */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="w-[95vw] max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-base md:text-lg">Anexar arquivo</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-3">
                        <Input
                            placeholder="Nome do arquivo"
                            value={dialogNomeArquivo}
                            onChange={e => setDialogNomeArquivo(e.target.value)}
                            disabled={uploading}
                            className="text-sm md:text-base"
                        />
                        {dialogErrors.nomeArquivo && (
                            <span className="text-red-500 text-xs mb-1">{dialogErrors.nomeArquivo}</span>
                        )}
                        <div>
                            <Input
                                type="file"
                                accept="image/*,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
                                onChange={handleDialogFileChange}
                                disabled={uploading}
                                className="flex-1 text-sm md:text-base"
                            />
                            {dialogFile && (
                                <span className="block text-xs text-slate-700 mt-1 truncate max-w-[200px]">
                                    {dialogFile.name}
                                </span>
                            )}
                            <span className="text-xs text-slate-500 block mt-1">
                                Imagens, PDFs ou planilhas. Tamanho máximo: 10MB.
                            </span>
                            {dialogErrors.file && (
                                <span className="text-red-500 text-xs">{dialogErrors.file}</span>
                            )}
                        </div>
                        {uploading && (
                            <Progress value={uploadProgress} className="w-full mt-2" />
                        )}
                    </div>
                    <DialogFooter className="mt-2 flex-col sm:flex-row gap-2">
                        <Button
                            type="button"
                            onClick={handleDialogAttach}
                            disabled={
                                uploading ||
                                !dialogFile ||
                                !dialogNomeArquivo.trim()
                            }
                            className="w-full sm:w-auto"
                        >
                            Anexar
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpenDialog(false)}
                            disabled={uploading}
                            className="w-full sm:w-auto"
                        >
                            Cancelar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {globalAlert && (
                <GlobalAlert
                    type={globalAlert.type}
                    message={globalAlert.message}
                    onClose={() => setGlobalAlert(null)}
                />
            )}
        </div>
    );
}