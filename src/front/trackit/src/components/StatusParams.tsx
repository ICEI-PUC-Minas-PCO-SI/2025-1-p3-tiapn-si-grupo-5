import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { Status } from "@/interfaces/InterfaceStatus";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface StatusParamsProps {
  isAdding: boolean;
  setIsAdding: (isAdding: boolean) => void;
}

export function StatusParams({ isAdding, setIsAdding }: StatusParamsProps) {
  const [statusList, setStatusList] = useState<Status[]>([]);
  const [newStatusName, setNewStatusName] = useState("");
  const [newStatusColor, setNewStatusColor] = useState("#000000"); // Cor padrão
  const [editingStatusId, setEditingStatusId] = useState<number | null>(null);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fetchStatuses = async () => {
    try {
      const response = await fetch("http://localhost:3000/status");
      if (!response.ok) {
        throw new Error("Erro ao buscar os status.");
      }
      const data = await response.json();
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

  const handleAddStatus = async (newStatus: {
    nomeStatus: string;
    color: string;
  }) => {
    try {
      const response = await fetch(
        "http://localhost:3000/status",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newStatus),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setAlert({ type: "error", message: errorData.error || "Erro ao adicionar status." });
        throw new Error("Erro ao adicionar status.");
      }

      const createdStatus = await response.json();
      setStatusList((prevList: Status[]) => [...prevList, createdStatus]);
      setAlert({ type: "success", message: "Status adicionado com sucesso!" });
    } catch (error) {
      console.error("Erro ao adicionar status no frontend:", error);
      setAlert({ type: "error", message: "Erro ao adicionar o status." });
    }
  };

  const handleEditStatus = (idStatus: number) => {
    const statusToEdit = statusList.find((status: Status) => status.idStatus === idStatus);
    if (!statusToEdit) return;

    setNewStatusName(statusToEdit.nomeStatus);
    setNewStatusColor(statusToEdit.hexCorPrimaria || "#000000"); // Usa a cor primária ou um padrão
    setEditingStatusId(idStatus); // Define o ID do status em edição
    setIsAdding(true); // Abre o formulário de edição
  };

  const handleSaveStatus = async () => {
    if (!newStatusName || !newStatusColor) {
      setAlert({ type: "error", message: "Preencha o nome e a cor do status." });
      return;
    }

    if (editingStatusId !== null) {
      try {
        const response = await fetch(
          `http://localhost:3000/status`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              idStatus: editingStatusId,
              nomeStatus: newStatusName,
              color: newStatusColor,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          setAlert({ type: "error", message: errorData.error || "Erro ao atualizar status." });
          throw new Error("Erro ao atualizar status.");
        }

        const updatedStatus = await response.json();
        setStatusList((prevList: Status[]) =>
          prevList.map((status: Status) =>
            status.idStatus === editingStatusId ? updatedStatus : status
          )
        );
        setAlert({ type: "success", message: "Status atualizado com sucesso!" });
      } catch (error) {
        console.error("Erro ao atualizar status no frontend:", error);
        setAlert({ type: "error", message: "Erro ao atualizar o status." });
      }
    } else {
      // Adicionar novo status
      handleAddStatus({
        nomeStatus: newStatusName,
        color: newStatusColor,
      });
    }

    // Resetar o formulário
    setNewStatusName("");
    setNewStatusColor("#000000");
    setEditingStatusId(null);
    setIsAdding(false);
  };

  const handleDeleteStatus = async (idStatus: number) => {
    try {
      console.log("Tentando excluir o status com id:", idStatus);

      const response = await fetch(
        "http://localhost:3000/status",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idStatus }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setAlert({ type: "error", message: errorData.error || "Erro ao excluir o status." });
        throw new Error("Erro ao excluir o status.");
      }

      setStatusList((prevList: Status[]) =>
        prevList.filter((status: Status) => status.idStatus !== idStatus)
      );
      setAlert({ type: "success", message: "Status excluído com sucesso!" });
    } catch (error) {
      console.error("Erro ao excluir o status no frontend:", error);
      setAlert({ type: "error", message: "Status associado a um chamado existente." });
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
        {statusList.map((status: Status) => (
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
          <Button onClick={handleSaveStatus}>Salvar</Button>
          <Button
            onClick={() => {
              setIsAdding(false);
              setNewStatusName("");
              setNewStatusColor("#000000");
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
