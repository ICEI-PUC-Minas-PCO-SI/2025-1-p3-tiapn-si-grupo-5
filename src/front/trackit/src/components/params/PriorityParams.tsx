import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { IPriority } from "@/api/priority";
import { GlobalAlert } from "@/components/ui/GlobalAlert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    getAllPriorities,
    addPriority,
    updatePriority,
    deletePriority,
} from "@/api/priority";
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

interface PriorityParamsProps {
    isAdding: boolean;
    setIsAdding: (isAdding: boolean) => void;
}

function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    if (typeof error === "string") return error;
    return "Erro desconhecido";
}

const priorityNameSchema = z.string().min(4, "O nome deve ter pelo menos 4 caracteres");

export function PriorityParams({ isAdding, setIsAdding }: PriorityParamsProps) {
    const [priorityList, setPriorityList] = useState<IPriority[]>([]);
    const [newPriorityName, setNewPriorityName] = useState("");
    const [newPriorityColor, setNewPriorityColor] = useState("#000000");
    const [editingPriorityId, setEditingPriorityId] = useState<number | null>(null);
    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [nameError, setNameError] = useState<string | null>(null);
    const [touched, setTouched] = useState(false);

    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: number | null }>({ open: false, id: null });

    const fetchPriorities = async () => {
        try {
            const data = await getAllPriorities();
            setPriorityList(data);
        } catch {
            setAlert({ type: "error", message: "Erro ao buscar prioridades." });
        }
    };

    useEffect(() => {
        fetchPriorities();
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
            const result = priorityNameSchema.safeParse(newPriorityName);
            setNameError(result.success ? null : result.error.issues[0].message);
        } else {
            setNameError(null);
        }
    }, [newPriorityName, isAdding, touched]);

    const handleAddOrEditPriority = async () => {
        const result = priorityNameSchema.safeParse(newPriorityName);
        if (!result.success || !newPriorityColor) {
            setNameError(result.success ? null : result.error.issues[0].message);
            setAlert({ type: "error", message: "Preencha o nome (mín. 8 caracteres) e a cor da prioridade." });
            return;
        }
        try {
            if (editingPriorityId !== null) {
                const updated = await updatePriority(editingPriorityId, newPriorityName, newPriorityColor);
                setPriorityList((prev) =>
                    prev.map((p) => (p.idPrioridade === editingPriorityId ? updated : p))
                );
                setAlert({ type: "success", message: "Prioridade atualizada com sucesso!" });
            } else {
                const created = await addPriority(newPriorityName, newPriorityColor);
                setPriorityList((prev) => [...prev, created]);
                setAlert({ type: "success", message: "Prioridade adicionada com sucesso!" });
            }
        } catch (error) {
            setAlert({ type: "error", message: getErrorMessage(error) || "Erro ao salvar prioridade." });
        }
        setNewPriorityName("");
        setNewPriorityColor("#000000");
        setEditingPriorityId(null);
        setIsAdding(false);
    };

    const handleEditPriority = (idPrioridade: number) => {
        const priorityToEdit = priorityList.find((p) => p.idPrioridade === idPrioridade);
        if (!priorityToEdit) return;
        setNewPriorityName(priorityToEdit.nomePrioridade);
        setNewPriorityColor(priorityToEdit.hexCorPrimaria || "#000000");
        setEditingPriorityId(idPrioridade);
        setIsAdding(true);
    };

    const handleDeletePriority = (idPrioridade: number) => {
        setDeleteDialog({ open: true, id: idPrioridade });
    };

    const confirmDeletePriority = async () => {
        if (!deleteDialog.id) return;
        try {
            await deletePriority(deleteDialog.id);
            setPriorityList((prev) => prev.filter((p) => p.idPrioridade !== deleteDialog.id));
            setAlert({ type: "success", message: "Prioridade excluída com sucesso!" });
        } catch (error) {
            setAlert({ type: "error", message: getErrorMessage(error) || "Prioridade associada a um chamado existente." });
        }
        setDeleteDialog({ open: false, id: null });
    };

    const isSaveDisabled = !newPriorityName || !!nameError;

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
                {priorityList.map((priority) => (
                    <li
                        key={priority.idPrioridade}
                        className="flex justify-between items-center py-2"
                    >
                        <div className="flex items-center gap-2">
                            <span
                                className="w-5 h-5 rounded-full"
                                style={{ backgroundColor: priority.hexCorPrimaria || "transparent" }}
                            ></span>
                            <span className="paragraph text-slate-700 dark:text-slate-300">{priority.nomePrioridade}</span>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="delete" size="icon" onClick={() => handleDeletePriority(priority.idPrioridade)}>
                                <Trash2 />
                            </Button>
                            <Button size="icon" onClick={() => handleEditPriority(priority.idPrioridade)}>
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
                        placeholder="Nome da prioridade"
                        value={newPriorityName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setNewPriorityName(e.target.value);
                            setTouched(true);
                        }}
                    />
                    <Input
                        type="color"
                        value={newPriorityColor}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPriorityColor(e.target.value)}
                        className="w-12 h-10"
                    />
                    <Button
                        onClick={handleAddOrEditPriority}
                        variant={isSaveDisabled ? "disabled" : "default"}
                        disabled={isSaveDisabled}
                    >
                        Salvar
                    </Button>
                    <Button
                        onClick={() => {
                            setIsAdding(false);
                            setNewPriorityName("");
                            setNewPriorityColor("#000000");
                            setEditingPriorityId(null);
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
                        <AlertDialogTitle>Excluir prioridade</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tem certeza que deseja excluir esta prioridade? Esta ação não poderá ser desfeita.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeleteDialog({ open: false, id: null })}>
                            Cancelar
                        </AlertDialogCancel>
                        <Button
                            variant="delete"
                            onClick={confirmDeletePriority}
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
