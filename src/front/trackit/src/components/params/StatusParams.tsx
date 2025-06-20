import { useState, useEffect, useMemo } from "react";
import { Pencil, Trash2, Plus, ArrowUpDown } from "lucide-react";
import type { IStatus } from "@/api/status";
import { GlobalAlert } from "@/components/ui/GlobalAlert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  getAllStatus,
  addStatus,
  updateStatus,
  deleteStatus,
} from "@/api/status";
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

const statusNameSchema = z.string()
  .min(5, "O nome deve ter pelo menos 5 caracteres")
  .max(40, "O nome deve ter no máximo 40 caracteres");

type StatusRow = IStatus & { id: number };

export function StatusParams() {
  const [statusList, setStatusList] = useState<IStatus[]>([]);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStatus, setEditingStatus] = useState<IStatus | null>(null);
  const [name, setName] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#000000");
  const [secondaryColor, setSecondaryColor] = useState("#ffffff");
  const [nameError, setNameError] = useState<string | null>(null);

  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: number | null }>({ open: false, id: null });

  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<IStatus[]>([]);
  const [isNameValid, setIsNameValid] = useState(false);

  useEffect(() => {
    fetchStatuses();
  }, []);

  async function fetchStatuses() {
    try {
      const data = await getAllStatus();
      setStatusList(data);
    } catch {
      setAlert({ type: "error", message: "Erro ao buscar status." });
    }
  }

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  useEffect(() => {
    let data = [...statusList];
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      data = data.filter(
        (s) =>
          s.nomeStatus.toLowerCase().includes(q) ||
          s.hexCorPrimaria.toLowerCase().includes(q) ||
          s.hexCorSecundaria.toLowerCase().includes(q)
      );
    }
    setFiltered(data);
  }, [statusList, search]);

  useEffect(() => {
    const result = statusNameSchema.safeParse(name);
    setIsNameValid(result.success);
    if (!name) setNameError(null);
    else if (!result.success) setNameError(result.error.issues[0].message);
    else setNameError(null);
  }, [name]);

  function openAddDialog() {
    setEditingStatus(null);
    setName("");
    setPrimaryColor("#000000");
    setSecondaryColor("#ffffff");
    setNameError(null);
    setDialogOpen(true);
  }

  function openEditDialog(status: IStatus) {
    setEditingStatus(status);
    setName(status.nomeStatus);
    setPrimaryColor(status.hexCorPrimaria || "#000000");
    setSecondaryColor(status.hexCorSecundaria || "#ffffff");
    setNameError(null);
    setDialogOpen(true);
  }

  async function handleSave() {
    const result = statusNameSchema.safeParse(name);
    if (!result.success) {
      setNameError(result.error.issues[0].message);
      return;
    }
    setNameError(null);
    try {
      if (editingStatus) {
        const updated = await updateStatus(
          editingStatus.idStatus,
          name,
          primaryColor,
          secondaryColor
        );
        setStatusList((prev) =>
          prev.map((s) => (s.idStatus === editingStatus.idStatus ? updated : s))
        );
        setAlert({ type: "success", message: "Status atualizado com sucesso!" });
      } else {
        const created = await addStatus(name, primaryColor, secondaryColor);
        setStatusList((prev) => [...prev, created]);
        setAlert({ type: "success", message: "Status adicionado com sucesso!" });
      }
      setDialogOpen(false);
    } catch {
      setAlert({ type: "error", message: "Erro ao salvar status." });
    }
  }

  async function confirmDeleteStatus() {
    if (!deleteDialog.id) return;
    try {
      await deleteStatus(deleteDialog.id);
      setStatusList((prev) => prev.filter((s) => s.idStatus !== deleteDialog.id));
      setAlert({ type: "success", message: "Status excluído com sucesso!" });
    } catch {
      setAlert({ type: "error", message: "Não é possível excluir um status associado a um chamado existente." });
    }
    setDeleteDialog({ open: false, id: null });
  }

  const columns = useMemo<ColumnDef<StatusRow>[]>(() => [
    {
      accessorKey: "nomeStatus",
      header: (info: HeaderContext<StatusRow, unknown>) => (
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
      cell: (info: CellContext<StatusRow, unknown>) => info.row.original.nomeStatus,
      enableHiding: true,
    },
    {
      accessorKey: "badge",
      header: "Badge (Preview)",
      cell: (info: CellContext<StatusRow, unknown>) => (
        <Badge
          style={{
            backgroundColor: info.row.original.hexCorPrimaria,
            color: info.row.original.hexCorSecundaria,
            border: "1px solid #e5e7eb",
          }}
          className="text-xs px-3 py-1 rounded"
        >
          {info.row.original.nomeStatus}
        </Badge>
      ),
    },
    {
      accessorKey: "hexCorPrimaria",
      header: (info: HeaderContext<StatusRow, unknown>) => (
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
      cell: (info: CellContext<StatusRow, unknown>) => (
        <span className="flex items-center justify-center gap-2">
          <span
            className="inline-block w-6 h-6 rounded-full border"
            style={{ backgroundColor: info.row.original.hexCorPrimaria }}
            title={info.row.original.hexCorPrimaria}
          />
          <span className="text-xs">{info.row.original.hexCorPrimaria}</span>
        </span>
      ),
    },
    {
      accessorKey: "hexCorSecundaria",
      header: (info: HeaderContext<StatusRow, unknown>) => (
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
      cell: (info: CellContext<StatusRow, unknown>) => (
        <span className="flex items-center justify-center gap-2">
          <span
            className="inline-block w-6 h-6 rounded-full border"
            style={{ backgroundColor: info.row.original.hexCorSecundaria }}
            title={info.row.original.hexCorSecundaria}
          />
          <span className="text-xs">{info.row.original.hexCorSecundaria}</span>
        </span>
      ),
    },
    {
      id: "actions",
      header: "Ações",
      cell: (info: CellContext<StatusRow, unknown>) => (
        <div className="flex justify-center gap-2">
          <Button size="icon" variant="outline" onClick={() => openEditDialog(info.row.original)} aria-label="Editar">
            <Pencil />
          </Button>
          <Button size="icon" variant="delete" onClick={() => setDeleteDialog({ open: true, id: info.row.original.idStatus })} aria-label="Excluir">
            <Trash2 />
          </Button>
        </div>
      ),
    },
  ], []);

  const filteredWithId: StatusRow[] = filtered.map((item) => ({
    ...item,
    id: item.idStatus,
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
              <Button variant="default" size="icon" aria-label="Novo status" onClick={openAddDialog}>
                <Plus className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingStatus ? "Editar status" : "Novo status"}
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <Input
                  placeholder="Nome do status"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                {nameError && (
                  <span className="text-red-500 text-xs">{nameError}</span>
                )}
                <div className="flex gap-4 items-center justify-between">
                  <div className="flex gap-4">
                    <div>
                      <label className="block text-xs mb-1">Cor primária</label>
                      <Input
                        type="color"
                        value={primaryColor}
                        onChange={e => setPrimaryColor(e.target.value)}
                        className="w-12 h-10 p-0 border-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1">Cor secundária</label>
                      <Input
                        type="color"
                        value={secondaryColor}
                        onChange={e => setSecondaryColor(e.target.value)}
                        className="w-12 h-10 p-0 border-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center ml-4">
                    <label className="block text-xs mb-1">Preview</label>
                    <Badge
                      style={{
                        backgroundColor: primaryColor,
                        color: secondaryColor,
                        border: "1px solid #e5e7eb",
                      }}
                      className="text-xs px-3 py-1 rounded"
                    >
                      {name || "Status"}
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
          nomeStatus: true,
          badge: true,
          hexCorPrimaria: true,
          hexCorSecundaria: true,
          actions: true,
        }}
      />
      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, id: open ? deleteDialog.id : null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir status</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este status? Esta ação não poderá ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialog({ open: false, id: null })}>
              Cancelar
            </AlertDialogCancel>
            <Button
              variant="delete"
              onClick={confirmDeleteStatus}
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
