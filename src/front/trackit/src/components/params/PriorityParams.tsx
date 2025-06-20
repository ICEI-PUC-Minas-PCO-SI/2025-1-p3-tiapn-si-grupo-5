import  { useState, useEffect, useMemo } from "react";
import { Pencil, Trash2, Plus, ArrowUpDown } from "lucide-react";
import type { IPriority } from "@/api/priority";
import { GlobalAlert } from "@/components/ui/GlobalAlert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    getAllPriorities,
    addPriority,
    updatePriority,
    deletePriority,
} from "@/api/priority";
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
import type { ColumnDef, HeaderContext, CellContext } from "@tanstack/react-table";

const priorityNameSchema = z.string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(20, "O nome deve ter no máximo 20 caracteres");

type PriorityRow = IPriority & { id: number };

export function PriorityParams() {
    const [priorityList, setPriorityList] = useState<IPriority[]>([]);
    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingPriority, setEditingPriority] = useState<IPriority | null>(null);
    const [name, setName] = useState("");
    const [primaryColor, setPrimaryColor] = useState("#2563eb");
    const [secondaryColor, setSecondaryColor] = useState("#ffffff");
    const [nameError, setNameError] = useState<string | null>(null);

    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: number | null }>({ open: false, id: null });

    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState<IPriority[]>([]);
    const [isNameValid, setIsNameValid] = useState(false);

    useEffect(() => {
        fetchPriorities();
    }, []);

    async function fetchPriorities() {
        try {
            const data = await getAllPriorities();
            setPriorityList(data);
        } catch {
            setAlert({ type: "error", message: "Erro ao buscar prioridades." });
        }
    }

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    useEffect(() => {
        let data = [...priorityList];
        if (search.trim()) {
            const q = search.trim().toLowerCase();
            data = data.filter(
                (p) =>
                    p.nomePrioridade.toLowerCase().includes(q) ||
                    p.hexCorPrimaria.toLowerCase().includes(q) ||
                    p.hexCorSecundaria.toLowerCase().includes(q)
            );
        }
        setFiltered(data);
    }, [priorityList, search]);

    useEffect(() => {
        // Validação dinâmica para habilitar/desabilitar o botão Salvar
        const result = priorityNameSchema.safeParse(name);
        setIsNameValid(result.success);
        if (!name) setNameError(null);
        else if (!result.success) setNameError(result.error.issues[0].message);
        else setNameError(null);
    }, [name]);

    function openAddDialog() {
        setEditingPriority(null);
        setName("");
        setPrimaryColor("#2563eb");
        setSecondaryColor("#ffffff");
        setNameError(null);
        setDialogOpen(true);
    }

    function openEditDialog(priority: IPriority) {
        setEditingPriority(priority);
        setName(priority.nomePrioridade);
        setPrimaryColor(priority.hexCorPrimaria || "#2563eb");
        setSecondaryColor(priority.hexCorSecundaria || "#ffffff");
        setNameError(null);
        setDialogOpen(true);
    }

    async function handleSave() {
        const result = priorityNameSchema.safeParse(name);
        if (!result.success) {
            setNameError(result.error.issues[0].message);
            return;
        }
        setNameError(null);
        try {
            if (editingPriority) {
                const updated = await updatePriority(
                    editingPriority.idPrioridade,
                    name,
                    primaryColor,
                    secondaryColor
                );
                setPriorityList((prev) =>
                    prev.map((p) => (p.idPrioridade === editingPriority.idPrioridade ? updated : p))
                );
                setAlert({ type: "success", message: "Prioridade atualizada com sucesso!" });
            } else {
                const created = await addPriority(name, primaryColor, secondaryColor);
                setPriorityList((prev) => [...prev, created]);
                setAlert({ type: "success", message: "Prioridade adicionada com sucesso!" });
            }
            setDialogOpen(false);
        } catch {
            setAlert({ type: "error", message: "Erro ao salvar prioridade." });
        }
    }

    async function confirmDeletePriority() {
        if (!deleteDialog.id) return;
        try {
            await deletePriority(deleteDialog.id);
            setPriorityList((prev) => prev.filter((p) => p.idPrioridade !== deleteDialog.id));
            setAlert({ type: "success", message: "Prioridade excluída com sucesso!" });
        } catch {
            setAlert({ type: "error", message: "Prioridade associada a um chamado existente." });
        }
        setDeleteDialog({ open: false, id: null });
    }

    // DataTable columns
    const columns = useMemo<ColumnDef<PriorityRow>[]>(() => [
        {
            accessorKey: "nomePrioridade",
            header: (info: HeaderContext<PriorityRow, unknown>) => (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => info.column.toggleSorting(info.column.getIsSorted() === "asc")}
                >
                    Nome
                    <ArrowUpDown
                        className={`ml-2 ${info.column.getIsSorted() === "asc"
                            ? "rotate-0"
                            : info.column.getIsSorted() === "desc"
                                ? "rotate-180"
                                : ""
                            }`}
                    />
                </Button>
            ),
            cell: (info: CellContext<PriorityRow, unknown>) => info.row.original.nomePrioridade,
            enableHiding: true,
        },
        {
            accessorKey: "badge",
            header: "Badge (Preview)",
            cell: (info: CellContext<PriorityRow, unknown>) => (
                <Badge
                    style={{
                        backgroundColor: info.row.original.hexCorPrimaria,
                        color: info.row.original.hexCorSecundaria,
                        border: "1px solid #e5e7eb",
                    }}
                    className="text-sm px-3 py-1 rounded"
                >
                    {info.row.original.nomePrioridade}
                </Badge>
            ),
        },
        {
            accessorKey: "hexCorPrimaria",
            header: (info: HeaderContext<PriorityRow, unknown>) => (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => info.column.toggleSorting(info.column.getIsSorted() === "asc")}
                >
                    Cor Primária
                    <ArrowUpDown
                        className={`ml-2 ${info.column.getIsSorted() === "asc"
                            ? "rotate-0"
                            : info.column.getIsSorted() === "desc"
                                ? "rotate-180"
                                : ""
                            }`}
                    />
                </Button>
            ),
            cell: (info: CellContext<PriorityRow, unknown>) => (
                <span className="flex items-center justify-center gap-2">
                    <span
                        className="inline-block w-6 h-6 rounded-full border"
                        style={{ backgroundColor: info.row.original.hexCorPrimaria }}
                        title={info.row.original.hexCorPrimaria}
                    />
                    <span className="text-sm">{info.row.original.hexCorPrimaria}</span>
                </span>
            ),
        },
        {
            accessorKey: "hexCorSecundaria",
            header: (info: HeaderContext<PriorityRow, unknown>) => (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => info.column.toggleSorting(info.column.getIsSorted() === "asc")}
                >
                    Cor Secundária
                    <ArrowUpDown
                        className={`ml-2 ${info.column.getIsSorted() === "asc"
                            ? "rotate-0"
                            : info.column.getIsSorted() === "desc"
                                ? "rotate-180"
                                : ""
                            }`}
                    />
                </Button>
            ),
            cell: (info: CellContext<PriorityRow, unknown>) => (
                <span className="flex items-center justify-center gap-2">
                    <span
                        className="inline-block w-6 h-6 rounded-full border"
                        style={{ backgroundColor: info.row.original.hexCorSecundaria }}
                        title={info.row.original.hexCorSecundaria}
                    />
                    <span className="text-sm">{info.row.original.hexCorSecundaria}</span>
                </span>
            ),
        },
        {
            id: "actions",
            header: "Ações",
            cell: (info: CellContext<PriorityRow, unknown>) => (
                <div className="flex justify-center gap-2">
                    <Button size="icon" variant="outline" onClick={() => openEditDialog(info.row.original)} aria-label="Editar">
                        <Pencil />
                    </Button>
                    <Button size="icon" variant="delete" onClick={() => setDeleteDialog({ open: true, id: info.row.original.idPrioridade })} aria-label="Excluir">
                        <Trash2 />
                    </Button>
                </div>
            ),
        },
    ], []);

    // Adapte o array para garantir o campo id
    const filteredWithId: PriorityRow[] = filtered.map((item) => ({
        ...item,
        id: item.idPrioridade,
    }));

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
                        placeholder="Pesquise pelo nome ou cor"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="max-w-xs"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="default" size="icon" aria-label="Nova prioridade" onClick={openAddDialog}>
                                <Plus className="w-4 h-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {editingPriority ? "Editar prioridade" : "Nova prioridade"}
                                </DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col gap-4">
                                <Input
                                    placeholder="Nome da prioridade"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                                {nameError && (
                                    <span className="text-red-500 text-sm">{nameError}</span>
                                )}
                                <div className="flex gap-4 items-center justify-between">
                                    <div className="flex gap-4">
                                        <div>
                                            <label className="block text-sm mb-1">Cor primária</label>
                                            <Input
                                                type="color"
                                                value={primaryColor}
                                                onChange={e => setPrimaryColor(e.target.value)}
                                                className="w-12 h-10 p-0 border-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm mb-1">Cor secundária</label>
                                            <Input
                                                type="color"
                                                value={secondaryColor}
                                                onChange={e => setSecondaryColor(e.target.value)}
                                                className="w-12 h-10 p-0 border-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center ml-4">
                                        <label className="block text-sm mb-1">Preview</label>
                                        <Badge
                                            style={{
                                                backgroundColor: primaryColor,
                                                color: secondaryColor,
                                                border: "1px solid #e5e7eb",
                                            }}
                                            className="text-sm px-3 py-1 rounded"
                                        >
                                            {name || "Prioridade"}
                                        </Badge>
                                    </div>
                                </div>
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
                data={filteredWithId}
                columns={columns}
                visibleColumns={{
                    nomePrioridade: true,
                    badge: true,
                    hexCorPrimaria: true,
                    hexCorSecundaria: true,
                    actions: true,
                }}
            />
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

