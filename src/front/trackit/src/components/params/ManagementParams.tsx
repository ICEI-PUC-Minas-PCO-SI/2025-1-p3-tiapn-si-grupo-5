import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Pencil, Trash2 } from "lucide-react";
import type { IManagement } from "../../api/management";
import { GlobalAlert } from "@/components/ui/GlobalAlert";
import {
  getAllActiveManagements,
  addManagement,
  updateManagement,
  deleteManagement,
} from "../../api/management";
import { z } from "zod";

const managementNameSchema = z.string().min(4, "O nome deve ter pelo menos 4 caracteres");

// Tipagem para erros desconhecidos
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
  const [newManagementName, setNewManagementName] = useState("");
  const [editingManagementId, setEditingManagementId] = useState<number | null>(null);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);

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

  useEffect(() => {
    if (!isAdding) {
      setNameError(null);
      return;
    }
    const result = managementNameSchema.safeParse(newManagementName);
    setNameError(result.success ? null : result.error.issues[0].message);
  }, [newManagementName, isAdding]);

  const handleAddOrEditManagement = async () => {
    const result = managementNameSchema.safeParse(newManagementName);
    if (!result.success) {
      setNameError(result.success ? null : result.error.issues[0].message);
      setAlert({ type: "error", message: "Preencha o nome (mín. 8 caracteres)." });
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

  const isSaveDisabled = !newManagementName || !!nameError;

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
            variant={isSaveDisabled ? "disabled" : "default"}
            disabled={isSaveDisabled}
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
          {nameError && (
            <span className="text-red-500 text-sm">{nameError}</span>
          )}
        </div>
      )}
    </div>
  );
}
