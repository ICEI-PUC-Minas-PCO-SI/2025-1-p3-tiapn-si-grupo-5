import React, { useState, useEffect, useMemo } from "react";
import { Pencil, Trash2, Plus, ArrowUpDown } from "lucide-react";
import type { IManagement } from "../../api/management";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { GlobalAlert } from "@/components/ui/GlobalAlert";
import {
  getAllActiveManagements,
  addManagement,
  updateManagement,
  deleteManagement,
} from "../../api/management";
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

const managementNameSchema = z.string()
  .min(3, "O nome deve ter pelo menos 3 caracteres")
  .max(20, "O nome deve ter no máximo 20 caracteres");

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Erro desconhecido";
}

interface ManagementParamsProps {
  isAdding: boolean;
  setIsAdding: (isAdding: boolean) => void;
}

export function ManagementParams({ isAdding, setIsAdding }: ManagementParamsProps) {
  const [managementList, setManagementList] = useState<IManagement[]>([]);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingManagement, setEditingManagement] = useState<IManagement | null>(null);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [isNameValid, setIsNameValid] = useState(false);

  // Delete dialog
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: number | null }>({ open: false, id: null });

  // Search/filter/sort state
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<IManagement[]>([]);

  useEffect(() => {
    fetchManagement();
  }, []);

  async function fetchManagement() {
    try {
      const data = await getAllActiveManagements();
      setManagementList(data);
    } catch (error) {
      setAlert({ type: "error", message: "Erro ao buscar as gerências." });
    }
  }

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  useEffect(() => {
    let data = [...managementList];
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      data = data.filter(
        (g) => g.nomeGerencia.toLowerCase().includes(q)
      );
    }
    setFiltered(data);
  }, [managementList, search]);

  useEffect(() => {
    // Validação dinâmica para habilitar/desabilitar o botão Salvar
    const result = managementNameSchema.safeParse(name);
    setIsNameValid(result.success);
    if (!name) setNameError(null);
    else if (!result.success) setNameError(result.error.issues[0].message);
    else setNameError(null);
  }, [name]);

  function openAddDialog() {
    setEditingManagement(null);
    setName("");
    setNameError(null);
    setDialogOpen(true);
  }

  function openEditDialog(management: IManagement) {
    setEditingManagement(management);
    setName(management.nomeGerencia);
    setNameError(null);
    setDialogOpen(true);
  }

  async function handleSave() {
    const result = managementNameSchema.safeParse(name);
    if (!result.success) {
      setNameError(result.error.issues[0].message);
      return;
    }
    setNameError(null);
    try {
      if (editingManagement) {
        const updated = await updateManagement(editingManagement.idGerencia, name);
        setManagementList((prev) =>
          prev.map((g) => (g.idGerencia === editingManagement.idGerencia ? updated : g))
        );
        setAlert({ type: "success", message: "Gerência atualizada com sucesso!" });
      } else {
        const created = await addManagement(name);
        setManagementList((prev) => [...prev, created]);
        setAlert({ type: "success", message: "Gerência adicionada com sucesso!" });
      }
      setDialogOpen(false);
    } catch (error) {
      setAlert({ type: "error", message: getErrorMessage(error) || "Erro ao salvar gerência." });
    }
  }

  async function confirmDeleteManagement() {
    if (!deleteDialog.id) return;
    try {
      await deleteManagement(deleteDialog.id);
      setManagementList((prev) => prev.filter((g) => g.idGerencia !== deleteDialog.id));
      setAlert({ type: "success", message: "Gerência excluída com sucesso!" });
    } catch (error) {
      setAlert({ type: "error", message: getErrorMessage(error) || "Gerência associada a um usuário existente." });
    }
    setDeleteDialog({ open: false, id: null });
  }

  // DataTable columns
  const columns = useMemo<ColumnDef<IManagement>[]>(() => [
    {
      accessorKey: "nomeGerencia",
      header: ({ column }: { column: Column<IManagement, unknown> }) => (
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
      cell: ({ row }: { row: Row<IManagement> }) => row.original.nomeGerencia,
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
          <Button size="icon" variant="delete" onClick={() => setDeleteDialog({ open: true, id: row.original.idGerencia })} aria-label="Excluir">
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
              <Button variant="default" size="icon" aria-label="Nova gerência" onClick={openAddDialog}>
                <Plus className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingManagement ? "Editar gerência" : "Nova gerência"}
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <Input
                  placeholder="Nome da gerência"
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
          nomeGerencia: true,
          actions: true,
        }}
      />
      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, id: open ? deleteDialog.id : null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir gerência</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta gerência? Esta ação não poderá ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialog({ open: false, id: null })}>
              Cancelar
            </AlertDialogCancel>
            <Button
              variant="delete"
              onClick={confirmDeleteManagement}
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