import { useState, useEffect, useMemo } from "react";
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
import type { ColumnDef, HeaderContext, CellContext } from "@tanstack/react-table";
import { useUser } from "@/contexts/UserContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TableSpinner } from "@/components/ui/spinner";
import { Searchbar } from "@/components/ui/SearchBar";

const managementNameSchema = z.string()
  .min(3, "O nome deve ter pelo menos 3 caracteres")
  .max(20, "O nome deve ter no máximo 20 caracteres");

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Erro desconhecido";
}

type ManagementRow = IManagement & { id: number };

export function ManagementParams() {
  const [managementList, setManagementList] = useState<IManagement[]>([]);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingManagement, setEditingManagement] = useState<IManagement | null>(null);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [isNameValid, setIsNameValid] = useState(false);
  const [loading, setLoading] = useState(true);

  // Adicione a validação para só permitir salvar se houver alteração ao editar
  const isEditingChanged =
    editingManagement == null ||
    name !== editingManagement.nomeGerencia;
  const canSave = isNameValid && (!editingManagement || isEditingChanged);

  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: number | null }>({ open: false, id: null });

  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<IManagement[]>([]);

  const { user, setUser } = useUser();

  useEffect(() => {
    fetchManagement();
  }, []);

  async function fetchManagement() {
    setLoading(true);
    try {
      const data = await getAllActiveManagements();
      setManagementList(data);
    } catch (error) {
      setAlert({ type: "error", message: "Erro ao buscar as gerências." });
      console.error("Erro ao buscar gerências:", error);
    }
    setLoading(false);
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
        if (user?.gerencia === editingManagement.idGerencia) {
          setUser({
            ...user,
            nomeGerencia: name,
          });
        }
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

  const columns = useMemo<ColumnDef<ManagementRow>[]>(() => [
    {
      accessorKey: "nomeGerencia",
      header: (info: HeaderContext<ManagementRow, unknown>) => (
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
      cell: (info: CellContext<ManagementRow, unknown>) => info.row.original.nomeGerencia,
      enableHiding: true,
    },
    {
      id: "actions",
      header: "Ações",
      cell: (info: CellContext<ManagementRow, unknown>) => (
        <div className="flex justify-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="outline" onClick={() => openEditDialog(info.row.original)} aria-label="Editar">
                  <Pencil />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Editar
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="delete" onClick={() => setDeleteDialog({ open: true, id: info.row.original.idGerencia })} aria-label="Excluir">
                  <Trash2 />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Deletar
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
  ], []);

  // Ajuste o tipo do array para ManagementRow
  const filteredWithId: ManagementRow[] = filtered.map((item) => ({
    ...item,
    id: item.idGerencia,
  }));

  return (
    <div className="space-y-4 w-full max-w-full overflow-hidden px-2 md:px-0">
      {alert && (
        <div className="fixed bottom-4 right-4 z-50">
          <GlobalAlert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
        <div className="flex-1 w-full sm:w-auto">
          <Searchbar
            placeholder="Pesquise pelo nome"
            onSearch={setSearch}
          />
        </div>
        <div className="flex items-center gap-2 justify-end">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="default" size="icon" aria-label="Nova gerência" onClick={openAddDialog}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Criar gerência
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-md">
              <DialogHeader>
                <DialogTitle className="text-base md:text-lg">
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
                  <span className="text-red-500 text-sm">{nameError}</span>
                )}
              </div>
              <DialogFooter className="mt-2 flex-col sm:flex-row gap-2">
                <Button
                  type="button"
                  onClick={handleSave}
                  disabled={!canSave}
                  className="w-full sm:w-auto"
                >
                  Salvar
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="w-full sm:w-auto">
                    Cancelar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {loading ? (
        <TableSpinner />
      ) : (
        <DataTableParams
          data={filteredWithId}
          columns={columns}
          visibleColumns={{
            nomeGerencia: true,
            actions: true,
          }}
        />
      )}
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