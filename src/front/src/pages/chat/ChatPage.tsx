import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Chat from "@/components/chat/Chat";
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getTicketById, assignTicket, closeTicket, updateTicketStatus, reopenTicket } from "@/api/ticket";
import { useUser } from "@/contexts/UserContext";
import { SecondarySpinner } from "@/components/ui/spinner";
import { updateTicketAnalyst } from "@/api/ticket";
import type { ITicketFull } from "@/api/ticket";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { GlobalAlert } from "@/components/ui/GlobalAlert";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { getAllStatus } from "@/api/status";
import type { IStatus } from "@/api/status";
import { getAllAnalysts } from "@/api/users";
import type { IAnalyst } from "@/api/users";

export function ChatPage() {
    const [searchParams] = useSearchParams();
    const idChamado = Number(searchParams.get("idChamado"));
    const [ticket, setTicket] = useState<ITicketFull | null>(null);
    const [loading, setLoading] = useState(true);
    const [assigning, setAssigning] = useState(false);
    const [closing, setClosing] = useState(false);
    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [assignModalOpen, setAssignModalOpen] = useState(false);
    const [closeModalOpen, setCloseModalOpen] = useState(false);
    const [statusModalOpen, setStatusModalOpen] = useState(false);
    const [allStatus, setAllStatus] = useState<IStatus[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>("");
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [analystModalOpen, setAnalystModalOpen] = useState(false);
    const [analysts, setAnalysts] = useState<IAnalyst[]>([]);
    const [selectedAnalyst, setSelectedAnalyst] = useState<string>("");
    const [assigningToAnalyst, setAssigningToAnalyst] = useState(false);
    // Novo estado para controlar reabertura
    const [reopening, setReopening] = useState(false);
    const [reopenModalOpen, setReopenModalOpen] = useState(false);

    const { user } = useUser();

    useEffect(() => {
        if (!idChamado) return;
        setLoading(true);
        getTicketById(idChamado)
            .then(setTicket)
            .finally(() => setLoading(false));
    }, [idChamado]);

    useEffect(() => {
        getAllStatus().then(setAllStatus);
    }, []);

    useEffect(() => {
        if (user?.tipo === 1) {
            getAllAnalysts().then(setAnalysts);
        }
    }, [user?.tipo]);

    const isAnalyst = user?.tipo === 2;
    const isManager = user?.tipo === 1;

    async function handleConfirmAssignTicket() {
        if (!ticket) return;
        setAssigning(true);
        try {
            await assignTicket(ticket.idChamado);
            const updated = await getTicketById(ticket.idChamado);
            setTicket(updated);
            setAlert({ type: "success", message: "Chamado assumido com sucesso!" });
            setAssignModalOpen(false);
        } catch {
            setAlert({ type: "error", message: "Erro ao assumir chamado." });
        } finally {
            setAssigning(false);
        }
    }

    async function handleConfirmCloseTicket() {
        if (!ticket) return;
        setClosing(true);
        try {
            const now = new Date().toISOString();
            await closeTicket(ticket.idChamado, now);
            const updated = await getTicketById(ticket.idChamado);
            setTicket(updated);
            setAlert({ type: "success", message: "Chamado encerrado com sucesso!" });
            setCloseModalOpen(false);
        } catch {
            setAlert({ type: "error", message: "Erro ao encerrar chamado." });
        } finally {
            setClosing(false);
        }
    }

    async function handleUpdateStatus() {
        if (!ticket || !selectedStatus) return;
        setUpdatingStatus(true);
        try {
            await updateTicketStatus(ticket.idChamado, Number(selectedStatus));
            const updated = await getTicketById(ticket.idChamado);
            setTicket(updated);
            setAlert({ type: "success", message: "Status atualizado com sucesso!" });
            setStatusModalOpen(false);
        } catch {
            setAlert({ type: "error", message: "Erro ao atualizar status." });
        } finally {
            setUpdatingStatus(false);
        }
    }

    async function handleAssignToAnalyst() {
        if (!ticket || !selectedAnalyst) return;
        setAssigningToAnalyst(true);
        try {
            await updateTicketAnalyst(ticket.idChamado, Number(selectedAnalyst));
            const updated = await getTicketById(ticket.idChamado);
            setTicket(updated);
            setAlert({ type: "success", message: "Chamado atribuído ao analista com sucesso!" });
            setAnalystModalOpen(false);
        } catch {
            setAlert({ type: "error", message: "Erro ao atribuir chamado ao analista." });
        } finally {
            setAssigningToAnalyst(false);
        }
    }

    // Função para reabrir chamado (status = 1, por exemplo "Em aberto")
    async function handleReopenTicket() {
        if (!ticket) return;
        setReopening(true);
        try {
            await reopenTicket(ticket.idChamado);
            const updated = await getTicketById(ticket.idChamado);
            setTicket(updated);
            setAlert({ type: "success", message: "Chamado reaberto com sucesso!" });
            setReopenModalOpen(false);
        } catch {
            setAlert({ type: "error", message: "Erro ao reabrir chamado." });
        } finally {
            setReopening(false);
        }
    }

    if (loading) {
        return (
            <div className="max-w-full">
                <SecondarySpinner />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 md:gap-6 h-full bg-white dark:bg-slate-950 px-2 md:px-0">
            {alert && (
                <GlobalAlert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}
            <header className="flex flex-col gap-3 md:gap-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 md:gap-4 mb-2 md:mb-4">
                    {/* Mobile: Stack vertically, Desktop: Side by side */}
                    <div className="flex flex-col sm:flex-row sm:flex-1 sm:justify-between sm:items-center gap-3 sm:gap-4">
                        {/* Esquerda: Assunto + Protocolo */}
                        <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                            <h1 className="title-h1 text-slate-950 dark:text-white text-lg md:text-xl lg:text-2xl truncate">
                                {ticket?.assunto
                                    ? ticket.assunto.length > 25
                                        ? ticket.assunto.slice(0, 25) + "..."
                                        : ticket.assunto
                                    : "Assunto da demanda"}
                            </h1>
                            <Badge variant="outline" className="h-8 md:h-10 dark:bg-slate-800 dark:text-white dark:border-slate-700 flex-shrink-0 text-xs md:text-sm">
                                {ticket?.protocolo && ticket.protocolo.length === 8
                                    ? `#${ticket.protocolo.slice(0, 6)}/${ticket.protocolo.slice(6, 8)}`
                                    : ticket?.protocolo
                                        ? `#${ticket.protocolo}`
                                        : "#XXXXXXXX/YY"}
                            </Badge>
                        </div>
                        {/* Direita: Prioridade + Status */}
                        <div className="flex gap-2 md:gap-4 items-center flex-shrink-0">
                            <Badge
                                className="text-xs md:text-sm px-2 md:px-3 py-1 rounded h-8 md:h-10 flex-shrink-0"
                                style={{
                                    backgroundColor: ticket?.prioridadechamado?.hexCorPrimaria,
                                    color: ticket?.prioridadechamado?.hexCorSecundaria,
                                    border: "1px solid #e5e7eb"
                                }}
                            >
                                <span className="truncate max-w-[80px] md:max-w-none">
                                    {ticket?.prioridadechamado?.nomePrioridade || "Prioridade"}
                                </span>
                            </Badge>
                            <Badge
                                className="text-xs md:text-sm px-2 md:px-3 py-1 rounded h-8 md:h-10 flex-shrink-0"
                                style={{
                                    backgroundColor: ticket?.statuschamado?.hexCorPrimaria || "#888",
                                    color: ticket?.statuschamado?.hexCorSecundaria,
                                    border: "1px solid #e5e7eb"
                                }}
                            >
                                <span className="truncate max-w-[80px] md:max-w-none">
                                    {ticket?.statuschamado?.nomeStatus || "Em aberto"}
                                </span>
                            </Badge>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2 md:mb-4">
                    <h2 className="title-h2 text-slate-800 dark:text-slate-300 text-base md:text-lg truncate">
                        {ticket?.tipochamado?.nomeTipo || "Tipo de demanda"}
                    </h2>
                    {isAnalyst && (
                        <div className="flex flex-wrap gap-2">
                            {/* Botão de reabrir chamado se fechado */}
                            {ticket?.dataFechamento && (
                                <>
                                    <Button
                                        className="bg-green-600 hover:bg-green-700 text-white border-green-700 text-xs md:text-sm"
                                        variant="default"
                                        size="sm"
                                        onClick={() => setReopenModalOpen(true)}
                                        disabled={reopening}
                                    >
                                        Reabrir
                                    </Button>
                                    <Dialog open={reopenModalOpen} onOpenChange={setReopenModalOpen}>
                                        <DialogContent className="w-[95vw] max-w-md">
                                            <DialogHeader>
                                                <DialogTitle className="text-base md:text-lg">Reabrir chamado</DialogTitle>
                                            </DialogHeader>
                                            <form
                                                onSubmit={e => {
                                                    e.preventDefault();
                                                    handleReopenTicket();
                                                }}
                                                className="flex flex-col gap-4"
                                            >
                                                <div className="text-sm md:text-base">
                                                    Tem certeza que deseja reabrir o chamado{" "}
                                                    <b>
                                                        {ticket?.protocolo && ticket.protocolo.length === 8
                                                            ? `#${ticket.protocolo.slice(0, 6)}/${ticket.protocolo.slice(6, 8)}`
                                                            : ticket?.protocolo
                                                                ? `#${ticket.protocolo}`
                                                                : "#XXXXXXXX/YY"}
                                                    </b>
                                                    ?
                                                </div>
                                                <DialogFooter className="flex-col sm:flex-row gap-2">
                                                    <Button
                                                        type="submit"
                                                        disabled={reopening}
                                                        className="w-full sm:w-auto"
                                                    >
                                                        {reopening ? "Reabrindo..." : "Confirmar"}
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => setReopenModalOpen(false)}
                                                        className="w-full sm:w-auto"
                                                    >
                                                        Cancelar
                                                    </Button>
                                                </DialogFooter>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </>
                            )}
                            {/* Botão de alterar status sempre disponível */}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setSelectedStatus(ticket?.idStatus ? String(ticket.idStatus) : "");
                                    setStatusModalOpen(true);
                                }}
                                className="dark:border-slate-700 dark:text-white text-xs md:text-sm"
                            >
                                Alterar status
                            </Button>
                            <Dialog open={statusModalOpen} onOpenChange={setStatusModalOpen}>
                                <DialogContent className="w-[95vw] max-w-md">
                                    <DialogHeader>
                                        <DialogTitle className="text-base md:text-lg">Alterar status do chamado</DialogTitle>
                                    </DialogHeader>
                                    <form
                                        onSubmit={e => {
                                            e.preventDefault();
                                            handleUpdateStatus();
                                        }}
                                        className="flex flex-col gap-4"
                                    >
                                        <Select
                                            value={selectedStatus}
                                            onValueChange={setSelectedStatus}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecione o status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {allStatus.map(status => (
                                                        <SelectItem key={status.idStatus} value={String(status.idStatus)}>
                                                            <span
                                                                className="inline-block w-3 h-3 rounded-full mr-2"
                                                                style={{ backgroundColor: status.hexCorPrimaria }}
                                                            />
                                                            {status.nomeStatus}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <DialogFooter className="flex-col sm:flex-row gap-2">
                                            <Button
                                                type="submit"
                                                disabled={!selectedStatus || updatingStatus}
                                                className="w-full sm:w-auto"
                                            >
                                                {updatingStatus ? "Salvando..." : "Confirmar"}
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setStatusModalOpen(false)}
                                                className="w-full sm:w-auto"
                                            >
                                                Cancelar
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                            {/* Botão de encerrar chamado, só aparece se não estiver fechado */}
                            {!ticket?.dataFechamento && (
                                <>
                                    <Button
                                        className="dark:bg-red-700 dark:text-white text-xs md:text-sm"
                                        variant="delete"
                                        size="sm"
                                        onClick={() => setCloseModalOpen(true)}
                                    >
                                        Encerrar
                                    </Button>
                                    <Dialog open={closeModalOpen} onOpenChange={setCloseModalOpen}>
                                        <DialogContent className="w-[95vw] max-w-md">
                                            <DialogHeader>
                                                <DialogTitle className="text-base md:text-lg">Encerrar chamado</DialogTitle>
                                            </DialogHeader>
                                            <form
                                                onSubmit={e => {
                                                    e.preventDefault();
                                                    handleConfirmCloseTicket();
                                                }}
                                                className="flex flex-col gap-4"
                                            >
                                                <div className="text-sm md:text-base">
                                                    Tem certeza que deseja encerrar o chamado{" "}
                                                    <b>
                                                        {ticket?.protocolo && ticket.protocolo.length === 8
                                                            ? `#${ticket.protocolo.slice(0, 6)}/${ticket.protocolo.slice(6, 8)}`
                                                            : ticket?.protocolo
                                                                ? `#${ticket.protocolo}`
                                                                : "#XXXXXXXX/YY"}
                                                    </b>
                                                    ?
                                                </div>
                                                <DialogFooter className="flex-col sm:flex-row gap-2">
                                                    <Button
                                                        type="submit"
                                                        disabled={closing}
                                                        variant="delete"
                                                        className="w-full sm:w-auto"
                                                    >
                                                        {closing ? "Encerrando..." : "Confirmar"}
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => setCloseModalOpen(false)}
                                                        className="w-full sm:w-auto"
                                                    >
                                                        Cancelar
                                                    </Button>
                                                </DialogFooter>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </>
                            )}
                        </div>
                    )}
                    {isManager && !ticket?.usuario_chamado_idAnalistaTousuario && (
                        <>
                            <Button
                                variant="default"
                                size="sm"
                                onClick={() => setAnalystModalOpen(true)}
                                disabled={assigningToAnalyst}
                                className="text-xs md:text-sm w-full sm:w-auto"
                            >
                                Atribuir
                            </Button>
                            <Dialog open={analystModalOpen} onOpenChange={setAnalystModalOpen}>
                                <DialogContent className="w-[95vw] max-w-md">
                                    <DialogHeader>
                                        <DialogTitle className="text-base md:text-lg">Atribuir chamado a analista</DialogTitle>
                                    </DialogHeader>
                                    <form
                                        onSubmit={e => {
                                            e.preventDefault();
                                            handleAssignToAnalyst();
                                        }}
                                        className="flex flex-col gap-4"
                                    >
                                        <Select
                                            value={selectedAnalyst}
                                            onValueChange={setSelectedAnalyst}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecione o analista" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {analysts.length === 0 && (
                                                        <SelectItem value="" disabled>
                                                            Nenhum analista disponível
                                                        </SelectItem>
                                                    )}
                                                    {analysts.map((analyst) => (
                                                        <SelectItem key={analyst.idUsuario} value={String(analyst.idUsuario)}>
                                                            {analyst.nomeUsuario}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <DialogFooter className="flex-col sm:flex-row gap-2">
                                            <Button
                                                type="submit"
                                                disabled={!selectedAnalyst || assigningToAnalyst}
                                                className="w-full sm:w-auto"
                                            >
                                                {assigningToAnalyst ? "Atribuindo..." : "Confirmar"}
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setAnalystModalOpen(false)}
                                                className="w-full sm:w-auto"
                                            >
                                                Cancelar
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </>
                    )}
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 md:gap-4 mb-2 md:mb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm md:text-base">
                        <span className="paragraph text-slate-700 dark:text-slate-300 truncate">
                            {ticket?.usuario_chamado_idSolicitanteTousuario?.nomeUsuario
                                ? `Aberto por: ${ticket.usuario_chamado_idSolicitanteTousuario.nomeUsuario.length > 20
                                    ? ticket.usuario_chamado_idSolicitanteTousuario.nomeUsuario.slice(0, 20) + "..."
                                    : ticket.usuario_chamado_idSolicitanteTousuario.nomeUsuario}` : ""}
                            {ticket?.usuario_chamado_idSolicitanteTousuario?.gerencia?.nomeGerencia
                                ? ` | ${ticket.usuario_chamado_idSolicitanteTousuario.gerencia.nomeGerencia.length > 15
                                    ? ticket.usuario_chamado_idSolicitanteTousuario.gerencia.nomeGerencia.slice(0, 15) + "..."
                                    : ticket.usuario_chamado_idSolicitanteTousuario.gerencia.nomeGerencia}` : ""}
                        </span>
                        <span className="paragraph text-slate-700 dark:text-slate-300 truncate">
                            Analista: {ticket?.usuario_chamado_idAnalistaTousuario?.nomeUsuario
                                ? ticket.usuario_chamado_idAnalistaTousuario.nomeUsuario.length > 20
                                    ? ticket.usuario_chamado_idAnalistaTousuario.nomeUsuario.slice(0, 20) + "..."
                                    : ticket.usuario_chamado_idAnalistaTousuario.nomeUsuario
                                : "-"}
                        </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm md:text-base">
                        <span className="paragraph text-slate-700 dark:text-slate-300">
                            Abertura: {ticket?.dataAbertura ? new Date(ticket.dataAbertura).toLocaleDateString("pt-BR") : "-"}
                        </span>
                        {isAnalyst && !ticket?.usuario_chamado_idAnalistaTousuario && (
                            <>
                                <Button
                                    className="dark:bg-sky-700 dark:text-white text-xs md:text-sm w-full sm:w-auto"
                                    variant="default"
                                    size="sm"
                                    onClick={() => setAssignModalOpen(true)}
                                    disabled={assigning}
                                >
                                    Atender
                                </Button>
                                <Dialog open={assignModalOpen} onOpenChange={setAssignModalOpen}>
                                    <DialogContent className="w-[95vw] max-w-md">
                                        <DialogHeader>
                                            <DialogTitle className="text-base md:text-lg">Assumir chamado</DialogTitle>
                                        </DialogHeader>
                                        <form
                                            onSubmit={e => {
                                                e.preventDefault();
                                                handleConfirmAssignTicket();
                                            }}
                                            className="flex flex-col gap-4"
                                        >
                                            <div className="text-sm md:text-base">
                                                Tem certeza que deseja assumir o chamado{" "}
                                                <b>
                                                    {ticket?.protocolo && ticket.protocolo.length === 8
                                                        ? `#${ticket.protocolo.slice(0, 6)}/${ticket.protocolo.slice(6, 8)}`
                                                        : ticket?.protocolo
                                                            ? `#${ticket.protocolo}`
                                                            : "#XXXXXXXX/YY"}
                                                </b>
                                                ?
                                            </div>
                                            <DialogFooter className="flex-col sm:flex-row gap-2">
                                                <Button
                                                    type="submit"
                                                    disabled={assigning}
                                                    className="w-full sm:w-auto"
                                                >
                                                    {assigning ? "Assumindo..." : "Confirmar"}
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => setAssignModalOpen(false)}
                                                    className="w-full sm:w-auto"
                                                >
                                                    Cancelar
                                                </Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </>
                        )}
                        {(isAnalyst && ticket?.usuario_chamado_idAnalistaTousuario) || !isAnalyst ? (
                            <span className="paragraph text-slate-700 dark:text-slate-300">
                                Fechamento: {ticket?.dataFechamento ? new Date(ticket.dataFechamento).toLocaleDateString("pt-BR") : "-"}
                            </span>
                        ) : null}
                    </div>
                </div>
                <Separator className="dark:bg-slate-700" />
            </header>
            <div className="flex-1 min-h-0">
                <Chat descricao={ticket?.descricao || ""} />
            </div>
        </div>
    )
}