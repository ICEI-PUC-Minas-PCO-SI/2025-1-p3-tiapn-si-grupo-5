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
        <div className="flex flex-col gap-6 h-full bg-white dark:bg-slate-950">
            {alert && (
                <GlobalAlert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}
            <header className="flex flex-col gap-4">
                <div className="flex justify-between items-center mb-4">
                    {/* Pai: justify-between */}
                    <div className="flex flex-1 justify-between items-center gap-4">
                        {/* Esquerda: Assunto + Protocolo */}
                        <div className="flex items-center gap-3">
                            <h1 className="title-h1 text-slate-950 dark:text-white">
                                {ticket?.assunto
                                    ? ticket.assunto.length > 30
                                        ? ticket.assunto.slice(0, 30) + "..."
                                        : ticket.assunto
                                    : "Assunto da demanda"}
                            </h1>
                            <Badge variant="outline" className="h-10 dark:bg-slate-800 dark:text-white dark:border-slate-700 align-top">
                                {ticket?.protocolo && ticket.protocolo.length === 8
                                    ? `#${ticket.protocolo.slice(0, 6)}/${ticket.protocolo.slice(6, 8)}`
                                    : ticket?.protocolo
                                        ? `#${ticket.protocolo}`
                                        : "#XXXXXXXX/YY"}
                            </Badge>
                        </div>
                        {/* Direita: Prioridade + Status */}
                        <div className="flex gap-4 items-center">
                            <Badge
                                className="text-sm px-3 py-1 rounded h-10"
                                style={{
                                    backgroundColor: ticket?.prioridadechamado?.hexCorPrimaria,
                                    color: ticket?.prioridadechamado?.hexCorSecundaria,
                                    border: "1px solid #e5e7eb"
                                }}
                            >
                                {ticket?.prioridadechamado?.nomePrioridade || "Prioridade"}
                            </Badge>
                            <Badge
                                className="text-sm px-3 py-1 rounded h-10"
                                style={{
                                    backgroundColor: ticket?.statuschamado?.hexCorPrimaria || "#888",
                                    color: ticket?.statuschamado?.hexCorSecundaria,
                                    border: "1px solid #e5e7eb"
                                }}
                            >
                                {ticket?.statuschamado?.nomeStatus || "Em aberto"}
                            </Badge>
                        </div>
                    </div>
                </div>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="title-h2 text-slate-800 dark:text-slate-300">
                        {ticket?.tipochamado?.nomeTipo || "Tipo de demanda"}
                    </h2>
                    {isAnalyst && (
                        <div className="flex gap-2">
                            {/* Botão de reabrir chamado se fechado */}
                            {ticket?.dataFechamento && (
                                <>
                                    <Button
                                        className="bg-green-600 hover:bg-green-700 text-white border-green-700"
                                        variant="default"
                                        size="sm"
                                        onClick={() => setReopenModalOpen(true)}
                                        disabled={reopening}
                                    >
                                        Reabrir
                                    </Button>
                                    <Dialog open={reopenModalOpen} onOpenChange={setReopenModalOpen}>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Reabrir chamado</DialogTitle>
                                            </DialogHeader>
                                            <form
                                                onSubmit={e => {
                                                    e.preventDefault();
                                                    handleReopenTicket();
                                                }}
                                                className="flex flex-col gap-4"
                                            >
                                                <div>
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
                                                <DialogFooter>
                                                    <Button
                                                        type="submit"
                                                        disabled={reopening}
                                                    >
                                                        {reopening ? "Reabrindo..." : "Confirmar"}
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => setReopenModalOpen(false)}
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
                                className="dark:border-slate-700 dark:text-white"
                            >
                                Alterar status
                            </Button>
                            <Dialog open={statusModalOpen} onOpenChange={setStatusModalOpen}>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Alterar status do chamado</DialogTitle>
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
                                        <DialogFooter>
                                            <Button
                                                type="submit"
                                                disabled={!selectedStatus || updatingStatus}
                                            >
                                                {updatingStatus ? "Salvando..." : "Confirmar"}
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setStatusModalOpen(false)}
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
                                        className="dark:bg-red-700 dark:text-white"
                                        variant="delete"
                                        size="sm"
                                        onClick={() => setCloseModalOpen(true)}
                                    >
                                        Encerrar
                                    </Button>
                                    <Dialog open={closeModalOpen} onOpenChange={setCloseModalOpen}>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Encerrar chamado</DialogTitle>
                                            </DialogHeader>
                                            <form
                                                onSubmit={e => {
                                                    e.preventDefault();
                                                    handleConfirmCloseTicket();
                                                }}
                                                className="flex flex-col gap-4"
                                            >
                                                <div>
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
                                                <DialogFooter>
                                                    <Button
                                                        type="submit"
                                                        disabled={closing}
                                                        variant="delete"
                                                    >
                                                        {closing ? "Encerrando..." : "Confirmar"}
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => setCloseModalOpen(false)}
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
                            >
                                Atribuir
                            </Button>
                            <Dialog open={analystModalOpen} onOpenChange={setAnalystModalOpen}>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Atribuir chamado a analista</DialogTitle>
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
                                        <DialogFooter>
                                            <Button
                                                type="submit"
                                                disabled={!selectedAnalyst || assigningToAnalyst}
                                            >
                                                {assigningToAnalyst ? "Atribuindo..." : "Confirmar"}
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setAnalystModalOpen(false)}
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
                <div className="flex justify-between items-center mb-4">
                    <span className="paragraph text-slate-700 dark:text-slate-300">
                        {ticket?.usuario_chamado_idSolicitanteTousuario?.nomeUsuario
                            ? `Aberto por: ${ticket.usuario_chamado_idSolicitanteTousuario.nomeUsuario}` : ""}
                        {ticket?.usuario_chamado_idSolicitanteTousuario?.gerencia?.nomeGerencia
                            ? ` | ${ticket.usuario_chamado_idSolicitanteTousuario.gerencia.nomeGerencia}` : ""}
                    </span>
                    <span className="paragraph text-slate-700 dark:text-slate-300">
                        Analista Responsável: {ticket?.usuario_chamado_idAnalistaTousuario?.nomeUsuario || "-"}
                    </span>
                    <span className="paragraph text-slate-700 dark:text-slate-300">
                        Data de Abertura: {ticket?.dataAbertura ? new Date(ticket.dataAbertura).toLocaleDateString("pt-BR") : "-"}
                    </span>
                    {isAnalyst && !ticket?.usuario_chamado_idAnalistaTousuario && (
                        <>
                            <Button
                                className="dark:bg-sky-700 dark:text-white"
                                variant="default"
                                size="sm"
                                onClick={() => setAssignModalOpen(true)}
                                disabled={assigning}
                            >
                                Atender
                            </Button>
                            <Dialog open={assignModalOpen} onOpenChange={setAssignModalOpen}>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Assumir chamado</DialogTitle>
                                    </DialogHeader>
                                    <form
                                        onSubmit={e => {
                                            e.preventDefault();
                                            handleConfirmAssignTicket();
                                        }}
                                        className="flex flex-col gap-4"
                                    >
                                        <div>
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
                                        <DialogFooter>
                                            <Button
                                                type="submit"
                                                disabled={assigning}
                                            >
                                                {assigning ? "Assumindo..." : "Confirmar"}
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setAssignModalOpen(false)}
                                            >
                                                Cancelar
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </>
                    )}
                    {isAnalyst && ticket?.usuario_chamado_idAnalistaTousuario && (
                        <span className="paragraph text-slate-700 dark:text-slate-300">
                            Data de Fechamento: {ticket?.dataFechamento ? new Date(ticket.dataFechamento).toLocaleDateString("pt-BR") : "-"}
                        </span>
                    )}
                    {!isAnalyst && (
                        <span className="paragraph text-slate-700 dark:text-slate-300">
                            Data de Fechamento: {ticket?.dataFechamento ? new Date(ticket.dataFechamento).toLocaleDateString("pt-BR") : "-"}
                        </span>
                    )}
                </div>
                <Separator className="dark:bg-slate-700" />
            </header>
            <Chat descricao={ticket?.descricao || ""} />
        </div>
    )
}