import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { ITicketType } from "@/api/tickettype";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlobalAlert } from "@/components/ui/GlobalAlert";
import {
    getAllTicketTypes,
    createTicketType,
    updateTicketType,
    deleteTicketType,
} from "@/api/tickettype";
import { z } from "zod";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";

const ticketTypeNameSchema = z.string().min(8, "O nome deve ter pelo menos 8 caracteres");

interface TicketTypeParamsProps {
    isAdding: boolean;
    setIsAdding: (isAdding: boolean) => void;
}

export function TicketTypeParams({ isAdding, setIsAdding }: TicketTypeParamsProps) {
    const [ticketTypes, setTicketTypes] = useState<ITicketType[]>([]);
    const [newName, setNewName] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [nameError, setNameError] = useState<string | null>(null);
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: number | null }>({ open: false, id: null });
    const [touched, setTouched] = useState(false);

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

    useEffect(() => {
        if (!isAdding) {
            setNameError(null);
            setTouched(false);
            return;
        }
        if (touched) {
            const result = ticketTypeNameSchema.safeParse(newName);
            setNameError(result.success ? null : result.error.issues[0].message);
        } else {
            setNameError(null);
        }
    }, [newName, isAdding, touched]);

    const handleAddOrEdit = async () => {
        const result = ticketTypeNameSchema.safeParse(newName);
        if (!result.success) {
            setNameError(result.success ? null : result.error.issues[0].message);
            setAlert({ type: "error", message: "Preencha o nome do tipo de demanda (mín. 8 caracteres)." });
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

    const handleDelete = (id: number) => {
        setDeleteDialog({ open: true, id });
    };

    const confirmDelete = async () => {
        if (!deleteDialog.id) return;
        try {
            await deleteTicketType(deleteDialog.id);
            setTicketTypes((prev) => prev.filter((t) => t.idTipoChamado !== deleteDialog.id));
            setAlert({ type: "success", message: "Tipo de demanda excluído!" });
        } catch (error) {
            const err = error as Error;
            const msg =
                typeof err.message === "string" && err.message !== "Erro ao deletar tipo de chamado"
                    ? err.message
                    : "Erro ao excluir tipo de demanda.";
            setAlert({ type: "error", message: msg });
        }
        setDeleteDialog({ open: false, id: null });
    };

    const isSaveDisabled = !newName || !!nameError;

    return (
        <div className="p-6">
            {alert && (
                <GlobalAlert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
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
                        onChange={(e) => {
                            setNewName(e.target.value);
                            setTouched(true);
                        }}
                    />
                    <Button
                        onClick={handleAddOrEdit}
                        variant={isSaveDisabled ? "disabled" : "default"}
                        disabled={isSaveDisabled}
                    >
                        Salvar
                    </Button>
                    <Button
                        onClick={() => {
                            setIsAdding(false);
                            setNewName("");
                            setEditingId(null);
                            setTouched(false);
                        }}
                        variant="outline"
                    >
                        Cancelar
                    </Button>
                    {nameError && touched && (
                        <span className="text-red-500 text-sm">{nameError}</span>
                    )}
                </div>
            )}
            <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, id: open ? deleteDialog.id : null })}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Excluir tipo de demanda</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tem certeza que deseja excluir este tipo de demanda? Esta ação não poderá ser desfeita.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeleteDialog({ open: false, id: null })}>
                            Cancelar
                        </AlertDialogCancel>
                        <Button
                            variant="delete"
                            onClick={confirmDelete}
                            type="button"
                        >
                            Excluir
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
