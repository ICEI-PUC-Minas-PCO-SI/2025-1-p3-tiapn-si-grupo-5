import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "..//ui/input";
import { Pencil, Trash2 } from "lucide-react";
import type { IManagement } from "../../api/Management";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X } from "lucide-react";
import {
  getAllActiveManagements,
  addManagement,
  updateManagement,
  deleteManagement,
} from "../../api/Management";

interface ManagementParamsProps {
  isAdding: boolean;
  setIsAdding: (isAdding: boolean) => void;
}

// Tipagem para erros desconhecidos
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Erro desconhecido";
}

export function ManagementParams({ isAdding, setIsAdding }: ManagementParamsProps) {
  const [managementList, setManagementList] = useState<IManagement[]>([]);
  const [newManagementName, setNewManagementName] = useState("");
  const [editingManagementId, setEditingManagementId] = useState<number | null>(null);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fetchManagement = async () => {
    try {
      const data = await getAllActiveManagements();
      setManagementList(data);
    } catch (error) {
      console.error(error);
      setAlert({ type: "error", message: "Erro ao buscar as gerências." });
    }
  };

  useEffect(() => {
    fetchManagement();
  }, []);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleAddOrEditManagement = async () => {
    if (!newManagementName) {
      setAlert({ type: "error", message: "Preencha o nome." });
      return;
    }
    try {
      if (editingManagementId !== null) {
        const updated = await updateManagement(editingManagementId, newManagementName);
        setManagementList((prev) =>
          prev.map((g) => (g.idGerencia === editingManagementId ? updated : g))
        );
        setAlert({ type: "success", message: "Gerência atualizada com sucesso!" });
      } else {
        const created = await addManagement(newManagementName);
        setManagementList((prev) => [...prev, created]);
        setAlert({ type: "success", message: "Gerência adicionada com sucesso!" });
      }
    } catch (error) {
      setAlert({ type: "error", message: getErrorMessage(error) || "Erro ao salvar gerência." });
    }
    setNewManagementName("");
    setEditingManagementId(null);
    setIsAdding(false);
  };

  const handleEditManagement = (idGerencia: number) => {
    const managementToEdit = managementList.find((g) => g.idGerencia === idGerencia);
    if (!managementToEdit) return;
    setNewManagementName(managementToEdit.nomeGerencia);
    setEditingManagementId(idGerencia);
    setIsAdding(true);
  };

  const handleDeleteManagement = async (idGerencia: number) => {
    try {
      await deleteManagement(idGerencia);
      setManagementList((prev) => prev.filter((g) => g.idGerencia !== idGerencia));
      setAlert({ type: "success", message: "Gerência excluída com sucesso!" });
    } catch (error) {
      setAlert({ type: "error", message: getErrorMessage(error) || "Gerência associada a um usuário existente." });
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
        {managementList.map((gerencia) => (
          <li
            key={gerencia.idGerencia}
            className="flex justify-between items-center py-2"
          >
            <div className="flex items-center gap-2">
              <span className="paragraph text-slate-700">{gerencia.nomeGerencia}</span>
            </div>
            <div className="flex gap-2 ">
              <Button variant="delete" size="icon"
                onClick={() => handleDeleteManagement(gerencia.idGerencia)}
              >
                <Trash2 />
              </Button>
              <Button size="icon"
                onClick={() => handleEditManagement(gerencia.idGerencia)}
              >
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
            value={newManagementName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewManagementName(e.target.value)}
          />
          <Button
            onClick={handleAddOrEditManagement}
          >
            Salvar
          </Button>
          <Button
            onClick={() => {
              setIsAdding(false);
              setNewManagementName("");
              setEditingManagementId(null);
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
