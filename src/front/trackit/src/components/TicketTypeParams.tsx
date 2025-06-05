import { useState, useEffect } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import type { ITicketType } from "@/api/TicketType";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    getAllTicketTypes,
    createTicketType,
    updateTicketType,
    deleteTicketType,
} from "@/api/TicketType";

interface TicketTypeParamsProps {
    isAdding: boolean;
    setIsAdding: (isAdding: boolean) => void;
}

export function TicketTypeParams({ isAdding, setIsAdding }: TicketTypeParamsProps) {
    const [ticketTypes, setTicketTypes] = useState<ITicketType[]>([]);
    const [newName, setNewName] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

    const fetchTicketTypes = async () => {
        try {
            const data = await getAllTicketTypes();
            setTicketTypes(data);
        } catch {
            setAlert({ type: "error", message: "Erro ao buscar tipos de demanda." });
        }
    };

    useEffect(() => {
        fetchTicketTypes();
    }, []);

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    const handleAddOrEdit = async () => {
        if (!newName) {
            setAlert({ type: "error", message: "Preencha o nome do tipo de demanda." });
            return;
        }
        try {
            if (editingId !== null) {
                const updated = await updateTicketType(editingId, newName);
                setTicketTypes((prev) =>
                    prev.map((t) => (t.idTipoChamado === editingId ? updated : t))
                );
                setAlert({ type: "success", message: "Tipo de demanda atualizado!" });
            } else {
                const created = await createTicketType(newName);
                setTicketTypes((prev) => [...prev, created]);
                setAlert({ type: "success", message: "Tipo de demanda adicionado!" });
            }
        } catch {
            setAlert({ type: "error", message: "Erro ao salvar tipo de demanda." });
        }
        setNewName("");
        setEditingId(null);
        setIsAdding(false);
    };

    const handleEdit = (id: number, nomeTipo: string) => {
        setEditingId(id);
        setNewName(nomeTipo);
        setIsAdding(true);
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteTicketType(id);
            setTicketTypes((prev) => prev.filter((t) => t.idTipoChamado !== id));
            setAlert({ type: "success", message: "Tipo de demanda excluído!" });
        } catch {
            setAlert({ type: "error", message: "Erro ao excluir tipo de demanda." });
        }
    };

    return (
        <div className="p-6">
            {alert && (
                <div className="fixed bottom-4 right-4 z-50">
                    <Alert
                        variant={alert.type === "success" ? "success" : "destructive"}
                        className="flex items-center justify-between space-x-4"
                    >
                        <div>
                            <AlertTitle>{alert.type === "success" ? "Sucesso" : "Erro"}</AlertTitle>
                            <AlertDescription>{alert.message}</AlertDescription>
                        </div>
                        <button
                            onClick={() => setAlert(null)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Fechar alerta"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </Alert>
                </div>
            )}
            <ul className="divide-y divide-gray-200">
                {ticketTypes.map((type) => (
                    <li key={type.idTipoChamado} className="flex justify-between items-center py-2">
                        <span className="paragraph text-slate-700">{type.nomeTipo}</span>
                        <div className="flex gap-2">
                            <Button variant="delete" size="icon" onClick={() => handleDelete(type.idTipoChamado)}>
                                <Trash2 />
                            </Button>
                            <Button size="icon" onClick={() => handleEdit(type.idTipoChamado, type.nomeTipo)}>
                                <Pencil />
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
            {isAdding && (
                <div className="mt-4 flex gap-2 items-center">
                    <Input
                        type="text"
                        placeholder="Nome do tipo de demanda"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <Button onClick={handleAddOrEdit}>Salvar</Button>
                    <Button
                        onClick={() => {
                            setIsAdding(false);
                            setNewName("");
                            setEditingId(null);
                        }}
                        variant="outline"
                    >
                        Cancelar
                    </Button>
                </div>
            )}
        </div>
    );
}
