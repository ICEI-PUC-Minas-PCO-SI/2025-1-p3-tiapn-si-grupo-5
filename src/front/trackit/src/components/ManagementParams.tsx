import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { Gerencia } from "@/interfaces/InterfaceManagement";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X } from "lucide-react";

interface ManagementParamsProps {
  isAdding: boolean;
  setIsAdding: (isAdding: boolean) => void;
}

export function ManagementParams({ isAdding, setIsAdding }: ManagementParamsProps) {
  const [managementList, setManagementList] = useState<Gerencia[]>([]);
  const [newManagementName, setNewManagementName] = useState("");
  const [editingManagementId, setEditingManagementId] = useState<number | null>(null);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fetchManagement = async () => {
    try {
      const response = await fetch("http://localhost:3000/gerencias/department");
      if (!response.ok) {
        throw new Error("Erro ao buscar as gerências.");
      }
      const data = await response.json();
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

  const handleAddManagement = async (newManagement: {
    nomeGerencia: string;
  }) => {
    try {
      const response = await fetch(
        "http://localhost:3000/gerencias/department",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newManagement),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setAlert({ type: "error", message: errorData.error || "Erro ao adicionar gerência." });
        throw new Error("Erro ao adicionar gerência.");
      }

      const createdManagement = await response.json();
      setManagementList((prevList: Gerencia[]) => [...prevList, createdManagement]);
      setAlert({ type: "success", message: "Gerência adicionada com sucesso!" });
    } catch (error) {
      console.error("Erro ao adicionar gerência no frontend:", error);
      setAlert({ type: "error", message: "Erro ao adicionar a gerência." });
    }
  };

  const handleEditManagement = (idGerencia: number) => {
    const managementToEdit = managementList.find((gerencia: Gerencia) => gerencia.idGerencia === idGerencia);
    if (!managementToEdit) return;

    setNewManagementName(managementToEdit.nomeGerencia);
    setEditingManagementId(idGerencia); // Define o ID do status em edição
    setIsAdding(true); // Abre o formulário de edição
  };

  const handleSaveManagement = async () => {
    if (!newManagementName) {
      setAlert({ type: "error", message: "Preencha o nome." });
      return;
    }

    if (editingManagementId !== null) {
      try {
        const response = await fetch(
          `http://localhost:3000/gerencias/department`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              idGerencia: editingManagementId,
              nomeGerencia: newManagementName,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          setAlert({ type: "error", message: errorData.error || "Erro ao atualizar gerÊncia." });
          throw new Error("Erro ao atualizar gerência.");
        }

        const updatedGerencia = await response.json();
        setManagementList((prevList: Gerencia[]) =>
          prevList.map((gerencia: Gerencia) =>
            gerencia.idGerencia === editingManagementId ? updatedGerencia : gerencia
          )
        );
        setAlert({ type: "success", message: "Gerência atualizado com sucesso!" });
      } catch (error) {
        console.error("Erro ao atualizar gerência no frontend:", error);
        setAlert({ type: "error", message: "Erro ao atualizar a gerência." });
      }
    } else {
      // Adicionar novo status
      handleAddManagement({
        nomeGerencia: newManagementName,
      });
    }

    // Resetar o formulário
    setNewManagementName("");
    setEditingManagementId(null);
    setIsAdding(false);
  };

  const handleDeleteMangement = async (idGerencia: number) => {
    try {
      console.log("Tentando excluir a gerência com id:", idGerencia);

      const response = await fetch(
        "http://localhost:3000/gerencias/department",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idGerencia }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setAlert({ type: "error", message: errorData.error || "Erro ao excluir a gerência." });
        throw new Error("Erro ao excluir o status.");
      }

      setManagementList((prevList: Gerencia[]) =>
        prevList.filter((gerencia: Gerencia) => gerencia.idGerencia !== idGerencia)
      );
      setAlert({ type: "success", message: "Gerência excluída com sucesso!" });
    } catch (error) {
      console.error("Erro ao excluir a gerência no frontend:", error);
      setAlert({ type: "error", message: "gerência associada a um usuário existente." });
    }
  };

  return (
    <div className="p-6 bg-white">
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
        {managementList.map((gerencia: Gerencia) => (
          <li
            key={gerencia.idGerencia}
            className="flex justify-between items-center py-2"
          >
            <div className="flex items-center gap-2">
              <span>{gerencia.nomeGerencia}</span>
            </div>
            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => handleDeleteMangement(gerencia.idGerencia)}
                className="text-gray-300 items-center w-20 h-10 flex justify-center rounded hover:bg-red-500 hover:shadow-lg transition duration-300 cursor-pointer"
              >
                <Trash2 />
              </button>
              <button
                onClick={() => handleEditManagement(gerencia.idGerencia)}
                className="text-gray-100 bg-blue-500 items-center w-20 h-10 flex justify-center rounded hover:bg-blue-300 hover:shadow-lg transition duration-300 cursor-pointer"
              >
                <Pencil />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {isAdding && (
        <div className="mt-4 flex gap-2 items-center">
          <input
            type="text"
            placeholder="Nome do status"
            value={newManagementName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewManagementName(e.target.value)}
            className="border rounded px-2 py-1 flex-1"
          />
          <button
            onClick={handleSaveManagement}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-300 hover:shadow-lg transition duration-300 cursor-pointer"
          >
            Salvar
          </button>
          <button
            onClick={() => {
              setIsAdding(false);
              setNewManagementName("");
            }}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-300 hover:shadow-lg transition duration-300 cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}
