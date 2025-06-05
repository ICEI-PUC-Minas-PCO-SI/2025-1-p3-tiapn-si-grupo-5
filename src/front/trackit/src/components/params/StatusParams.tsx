import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { IStatus } from "@/api/Status";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getAllStatus,
  addStatus,
  updateStatus,
  deleteStatus,
} from "@/api/Status";

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

export function StatusParams({ isAdding, setIsAdding }: StatusParamsProps) {
  const [statusList, setStatusList] = useState<IStatus[]>([]);
  const [newStatusName, setNewStatusName] = useState("");
  const [newStatusColor, setNewStatusColor] = useState("#000000"); // Cor padrão
  const [editingStatusId, setEditingStatusId] = useState<number | null>(null);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

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

  const handleAddOrEditStatus = async () => {
    if (!newStatusName || !newStatusColor) {
      setAlert({ type: "error", message: "Preencha o nome e a cor do status." });
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

  const handleDeleteStatus = async (idStatus: number) => {
    try {
      await deleteStatus(idStatus);
      setStatusList((prev) => prev.filter((s) => s.idStatus !== idStatus));
      setAlert({ type: "success", message: "Status excluído com sucesso!" });
    } catch (error) {
      setAlert({ type: "error", message: getErrorMessage(error) || "Status associado a um chamado existente." });
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
          <Button onClick={handleAddOrEditStatus}>Salvar</Button>
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
        </div>
      )}
    </div>
  );
}
