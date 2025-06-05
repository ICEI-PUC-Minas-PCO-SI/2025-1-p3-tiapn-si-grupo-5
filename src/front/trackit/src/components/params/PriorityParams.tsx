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

interface PriorityParamsProps {
    isAdding: boolean;
    setIsAdding: (isAdding: boolean) => void;
}

function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    if (typeof error === "string") return error;
    return "Erro desconhecido";
}

const priorityNameSchema = z.string().min(8, "O nome deve ter pelo menos 8 caracteres");

export function PriorityParams({ isAdding, setIsAdding }: PriorityParamsProps) {
    const [priorityList, setPriorityList] = useState<IPriority[]>([]);
    const [newPriorityName, setNewPriorityName] = useState("");
    const [newPriorityColor, setNewPriorityColor] = useState("#000000");
    const [editingPriorityId, setEditingPriorityId] = useState<number | null>(null);
    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [nameError, setNameError] = useState<string | null>(null);

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
            return;
        }
        const result = priorityNameSchema.safeParse(newPriorityName);
        setNameError(result.success ? null : result.error.issues[0].message);
    }, [newPriorityName, isAdding]);

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

    const handleDeletePriority = async (idPrioridade: number) => {
        try {
            await deletePriority(idPrioridade);
            setPriorityList((prev) => prev.filter((p) => p.idPrioridade !== idPrioridade));
            setAlert({ type: "success", message: "Prioridade excluída com sucesso!" });
        } catch (error) {
            setAlert({ type: "error", message: getErrorMessage(error) || "Prioridade associada a um chamado existente." });
        }
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
                            <span className="paragraph text-slate-700">{priority.nomePrioridade}</span>
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPriorityName(e.target.value)}
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
                        }}
                        variant="outline"
                    >
                        Cancelar
                    </Button>
                    {nameError && (
                        <span className="text-red-500 text-sm">{nameError}</span>
                    )}
                </div>
            )}
        </div>
    );
}
