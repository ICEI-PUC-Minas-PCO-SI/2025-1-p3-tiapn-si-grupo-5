import React, { useState, useEffect, useMemo } from "react";
import { Pencil, Trash2, Plus, ArrowUpDown } from "lucide-react";
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
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { DataTableParams } from "./DataTableParams";
import type { ColumnDef, Column, Row } from "@tanstack/react-table";

const ticketTypeNameSchema = z.string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(20, "O nome deve ter no máximo 20 caracteres");

export function TicketTypeParams() {
    const [ticketTypes, setTicketTypes] = useState<ITicketType[]>([]);
    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingType, setEditingType] = useState<ITicketType | null>(null);
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState<string | null>(null);
    const [isNameValid, setIsNameValid] = useState(false);

    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: number | null }>({ open: false, id: null });

    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState<ITicketType[]>([]);

    useEffect(() => {
        fetchTicketTypes();
    }, []);

    async function fetchTicketTypes() {
        try {
            const data = await getAllTicketTypes();
            setTicketTypes(data);
        } catch {
            setAlert({ type: "error", message: "Erro ao buscar tipos de demanda." });
        }
    }

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    useEffect(() => {
        let data = [...ticketTypes];
        if (search.trim()) {
            const q = search.trim().toLowerCase();
            data = data.filter(
                (t) =>
                    t.nomeTipo.toLowerCase().includes(q)
            );
        }
        setFiltered(data);
    }, [ticketTypes, search]);

    useEffect(() => {
        // Validação dinâmica para habilitar/desabilitar o botão Salvar
        const result = ticketTypeNameSchema.safeParse(name);
        setIsNameValid(result.success);
        if (!name) setNameError(null);
        else if (!result.success) setNameError(result.error.issues[0].message);
        else setNameError(null);
    }, [name]);

    function openAddDialog() {
        setEditingType(null);
        setName("");
        setNameError(null);
        setDialogOpen(true);
    }

    function openEditDialog(type: ITicketType) {
        setEditingType(type);
        setName(type.nomeTipo);
        setNameError(null);
        setDialogOpen(true);
    }

    async function handleSave() {
        const result = ticketTypeNameSchema.safeParse(name);
        if (!result.success) {
            setNameError(result.error.issues[0].message);
            return;
        }
        setNameError(null);
        try {
            if (editingType) {
                const updated = await updateTicketType(editingType.idTipoChamado, name);
                setTicketTypes((prev) =>
                    prev.map((t) => (t.idTipoChamado === editingType.idTipoChamado ? updated : t))
                );
                setAlert({ type: "success", message: "Tipo de demanda atualizado!" });
            } else {
                const created = await createTicketType(name);
                setTicketTypes((prev) => [...prev, created]);
                setAlert({ type: "success", message: "Tipo de demanda adicionado!" });
            }
            setDialogOpen(false);
        } catch {
            setAlert({ type: "error", message: "Erro ao salvar tipo de demanda." });
        }
    }

    async function confirmDelete() {
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
    }

    // DataTable columns
    const columns = useMemo<ColumnDef<ITicketType>[]>(() => [
        {
            accessorKey: "nomeTipo",
            header: ({ column }: { column: Column<ITicketType, unknown> }) => (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nome
                    <ArrowUpDown
                        className={`ml-2 ${column.getIsSorted() === "asc"
                            ? "rotate-0"
                            : column.getIsSorted() === "desc"
                                ? "rotate-180"
                                : ""
                            }`}
                    />
                </Button>
            ),
            cell: ({ row }: { row: Row<ITicketType> }) => row.original.nomeTipo,
            enableHiding: true,
        },
        {
            id: "actions",
            header: "Ações",
            cell: ({ row }) => (
                <div className="flex justify-center gap-2">
                    <Button size="icon" variant="outline" onClick={() => openEditDialog(row.original)} aria-label="Editar">
                        <Pencil />
                    </Button>
                    <Button size="icon" variant="delete" onClick={() => setDeleteDialog({ open: true, id: row.original.idTipoChamado })} aria-label="Excluir">
                        <Trash2 />
                    </Button>
                </div>
            ),
        },
    ], []);

    return (
        <div className="space-y-4">
            {alert && (
                <div className="fixed bottom-4 right-4 z-50">
                    <GlobalAlert
                        type={alert.type}
                        message={alert.message}
                        onClose={() => setAlert(null)}
                    />
                </div>
            )}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
                <div className="flex-1">
                    <Input
                        placeholder="Pesquise pelo nome"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="max-w-xs"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="default" size="icon" aria-label="Novo tipo de demanda" onClick={openAddDialog}>
                                <Plus className="w-4 h-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {editingType ? "Editar tipo de demanda" : "Novo tipo de demanda"}
                                </DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col gap-4">
                                <Input
                                    placeholder="Nome do tipo de demanda"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                                {nameError && (
                                    <span className="text-red-500 text-xs">{nameError}</span>
                                )}
                            </div>
                            <DialogFooter className="mt-2">
                                <Button
                                    type="button"
                                    onClick={handleSave}
                                    disabled={!isNameValid}
                                >
                                    Salvar
                                </Button>
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">
                                        Cancelar
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <DataTableParams
                data={filtered}
                columns={columns}
                visibleColumns={{
                    nomeTipo: true,
                    actions: true,
                }}
            />
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
