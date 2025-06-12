import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Chat from "@/components/chat/Chat";
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getTicketById, assignTicket } from "@/api/ticket";
import { useUser } from "@/contexts/UserContext";
import { SecondarySpinner } from "@/components/ui/spinner";
import type { ITicketFull } from "@/api/ticket";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { GlobalAlert } from "@/components/ui/GlobalAlert";

export function ChatPage() {
    const [searchParams] = useSearchParams();
    const idChamado = Number(searchParams.get("idChamado"));
    const [ticket, setTicket] = useState<ITicketFull | null>(null);
    const [loading, setLoading] = useState(true);
    const [showFecharDemanda, setShowFecharDemanda] = useState(true);
    const [assigning, setAssigning] = useState(false);
    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [assignModalOpen, setAssignModalOpen] = useState(false);
    const { user } = useUser();

    useEffect(() => {
        if (!idChamado) return;
        setLoading(true);
        getTicketById(idChamado)
            .then(setTicket)
            .finally(() => setLoading(false));
    }, [idChamado]);

    const isAnalyst = user?.tipo === 2;

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

    if (loading) {
        return (
            <div className="max-w-full">
                <SecondarySpinner />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 h-full">
            {alert && (
                <GlobalAlert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}
            <header className="flex flex-col gap-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-4 items-center">
                        <h1 className="title-h1 text-slate-950">
                            {ticket?.assunto || "Assunto da demanda"}
                        </h1>
                        <Badge variant="outline" className="h-10">
                            {ticket?.protocolo && ticket.protocolo.length === 8
                                ? `#${ticket.protocolo.slice(0, 6)}/${ticket.protocolo.slice(6, 8)}`
                                : ticket?.protocolo
                                    ? `#${ticket.protocolo}`
                                    : "#XXXXXXXX/YY"}
                        </Badge>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Badge
                            className="h-10"
                            style={{
                                backgroundColor: ticket?.prioridadechamado?.hexCorPrimaria,
                                color: "#fff"
                            }}
                        >
                            {ticket?.prioridadechamado?.nomePrioridade || "Prioridade"}
                        </Badge>
                        <Badge
                            className="h-10"
                            style={{
                                backgroundColor: ticket?.statuschamado?.hexCorPrimaria || "#888",
                                color: "#fff"
                            }}
                        >
                            {ticket?.statuschamado?.nomeStatus || "Em aberto"}
                        </Badge>
                    </div>
                </div>
                <div className="mb-4">
                    <h2 className="title-h2 text-slate-800">
                        {ticket?.tipochamado?.nomeTipo || "Tipo de demanda"}
                    </h2>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <span className="paragraph text-slate-700">
                        Analista Responsável: {ticket?.usuario_chamado_idAnalistaTousuario?.nomeUsuario || "-"}
                    </span>
                    <span className="paragraph text-slate-700">
                        Data de Abertura: {ticket?.dataAbertura ? new Date(ticket.dataAbertura).toLocaleDateString("pt-BR") : "-"}
                    </span>
                    {isAnalyst ? (
                        !ticket?.usuario_chamado_idAnalistaTousuario ? (
                            <>
                                <Button
                                    className=""
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
                        ) : ticket?.dataFechamento ? (
                            <span className="paragraph text-slate-700">
                                Data de Fechamento: {new Date(ticket.dataFechamento).toLocaleDateString("pt-BR")}
                            </span>
                        ) : (
                            showFecharDemanda && (
                                <Button
                                    className=""
                                    variant="delete"
                                    size="sm"
                                    onClick={() => setShowFecharDemanda(false)}
                                >
                                    Encerrar
                                </Button>
                            )
                        )
                    ) : (
                        <span className="paragraph text-slate-700">
                            Data de Fechamento: {ticket?.dataFechamento ? new Date(ticket.dataFechamento).toLocaleDateString("pt-BR") : "-"}
                        </span>
                    )}
                </div>
                <Separator />
            </header>
            <Chat />
        </div>
    )
}