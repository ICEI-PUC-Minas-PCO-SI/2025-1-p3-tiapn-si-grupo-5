import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { IStatus } from "@/api/status";
import { GlobalAlert } from "@/components/ui/GlobalAlert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getAllStatus,
  addStatus,
  updateStatus,
  deleteStatus,
} from "@/api/status";
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

interface StatusParamsProps {
  isAdding: boolean;
  setIsAdding: (isAdding: boolean) => void;
}

// Tipagem para erros desconhecidos
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Erro desconhecido";
}

const statusNameSchema = z.string().min(8, "O nome deve ter pelo menos 8 caracteres");

export function StatusParams({ isAdding, setIsAdding }: StatusParamsProps) {
  const [statusList, setStatusList] = useState<IStatus[]>([]);
  const [newStatusName, setNewStatusName] = useState("");
  const [newStatusColor, setNewStatusColor] = useState("#000000"); // Cor padrão
  const [editingStatusId, setEditingStatusId] = useState<number | null>(null);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);

  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: number | null }>({ open: false, id: null });

  const fetchStatuses = async () => {
    try {
      const data = await getAllStatus();
      setStatusList(data);
    } catch (error) {
      console.error(error);
      setAlert({ type: "error", message: "Erro ao buscar os status." });
    }
  };

  useEffect(() => {
    fetchStatuses();
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
    const result = statusNameSchema.safeParse(newStatusName);
    setNameError(result.success ? null : result.error.issues[0].message);
  }, [newStatusName, isAdding]);

  const handleAddOrEditStatus = async () => {
    const result = statusNameSchema.safeParse(newStatusName);
    if (!result.success || !newStatusColor) {
      setNameError(result.success ? null : result.error.issues[0].message);
      setAlert({ type: "error", message: "Preencha o nome (mín. 8 caracteres) e a cor do status." });
      return;
    }
    try {
      if (editingStatusId !== null) {
        const updated = await updateStatus(editingStatusId, newStatusName, newStatusColor);
        setStatusList((prev) =>
          prev.map((s) => (s.idStatus === editingStatusId ? updated : s))
        );
        setAlert({ type: "success", message: "Status atualizado com sucesso!" });
      } else {
        const created = await addStatus(newStatusName, newStatusColor);
        setStatusList((prev) => [...prev, created]);
        setAlert({ type: "success", message: "Status adicionado com sucesso!" });
      }
    } catch (error) {
      setAlert({ type: "error", message: getErrorMessage(error) || "Erro ao salvar status." });
    }
    setNewStatusName("");
    setNewStatusColor("#000000");
    setEditingStatusId(null);
    setIsAdding(false);
  };

  const handleEditStatus = (idStatus: number) => {
    const statusToEdit = statusList.find((status) => status.idStatus === idStatus);
    if (!statusToEdit) return;
    setNewStatusName(statusToEdit.nomeStatus);
    setNewStatusColor(statusToEdit.hexCorPrimaria || "#000000");
    setEditingStatusId(idStatus);
    setIsAdding(true);
  };

  const handleDeleteStatus = (idStatus: number) => {
    setDeleteDialog({ open: true, id: idStatus });
  };

  const confirmDeleteStatus = async () => {
    if (!deleteDialog.id) return;
    try {
      await deleteStatus(deleteDialog.id);
      setStatusList((prev) => prev.filter((s) => s.idStatus !== deleteDialog.id));
      setAlert({ type: "success", message: "Status excluído com sucesso!" });
    } catch (error) {
      setAlert({ type: "error", message: getErrorMessage(error) || "Status associado a um chamado existente." });
    }
    setDeleteDialog({ open: false, id: null });
  };

  const isSaveDisabled = !newStatusName || !!nameError;

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
        {statusList.map((status) => (
          <li
            key={status.idStatus}
            className="flex justify-between items-center py-2"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-5 h-5 rounded-full"
                style={{ backgroundColor: status.hexCorPrimaria || "transparent" }}
              ></span>
              <span className="paragraph text-slate-700">{status.nomeStatus}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="delete" size="icon" onClick={() => handleDeleteStatus(status.idStatus)}>
                <Trash2 />
              </Button>
              <Button size="icon" onClick={() => handleEditStatus(status.idStatus)}>
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
            placeholder="Nome do status"
            value={newStatusName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewStatusName(e.target.value)}
          />
          <Input
            type="color"
            value={newStatusColor}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewStatusColor(e.target.value)}
            className="w-12 h-10"
          />
          <Button
            onClick={handleAddOrEditStatus}
            variant={isSaveDisabled ? "disabled" : "default"}
            disabled={isSaveDisabled}
          >
            Salvar
          </Button>
          <Button
            onClick={() => {
              setIsAdding(false);
              setNewStatusName("");
              setNewStatusColor("#000000");
              setEditingStatusId(null);
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
