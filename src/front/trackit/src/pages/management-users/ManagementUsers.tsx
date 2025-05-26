import { useEffect, useState } from "react";
import { DataTableUsers } from "@/components/DataTableUsers";
import { Searchbar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { CrudUserForm } from "@/components/CrudUserForm";
import { PutUserForm } from "@/components/PutUserForm";
import { Dialog } from "@/components/ui/dialog";
import type { User, ActionButton } from "@/interfaces/InterfacesDataTableUsers";
import type { UpdateUser } from "@/interfaces/InterfaceUpdateUser";
import { getAllUsers } from "@/api/users";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X } from "lucide-react";

export function ManagementUsers() {
  const [Data, setData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>(Data);
  const [visibleColumns, setVisibleColumns] = useState<
    Record<keyof User, boolean>
  >({
    id: true,
    name: true,
    accessType: true,
    management: true,
    ativo: true,
  });
  const [editModalState, setEditModalState] = useState<{
    isOpen: boolean;
    user: UpdateUser | null;
  }>({ isOpen: false, user: null });
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fetchUsers = async () => {
    try {
      const users = await getAllUsers();
      setData(users);
    } catch (error) {
      console.error("Erro ao processar usuários:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredData(Data);
  }, [Data]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const mapUserToUpdateUser = (user: User & { matricula?: string }): UpdateUser => {
    return {
      idUsuario: Number(user.id),
      matricula: user.matricula || "",
      gerencia: user.management.idGerencia,
      tipoUsuario:
        user.accessType === "Gestor"
          ? 1
          : user.accessType === "Analista"
            ? 2
            : 3,
    };
  };

  const openEditModal = (user: User) => {
    setEditModalState({
      isOpen: true,
      user: mapUserToUpdateUser(user as User & { matricula?: string }),
    });
  };

  const closeEditModal = () => {
    setEditModalState({ isOpen: false, user: null });
  };

  const handleSuccess = () => {
    fetchUsers();
    setAlert({ type: "success", message: "Usuário atualizado com sucesso!" });
    closeEditModal();
  };

  const handleError = () => {
    setAlert({ type: "error", message: "Erro ao atualizar usuário. Verifique os dados e tente novamente." });
  };

  const actions: ActionButton[] = [
    {
      label: "Editar",
      onClick: (row) => openEditModal(row),
      variant: "outline",
    },
    {
      label: "Desativar",
      onClick: (row) => console.log("Desativando:", row),
      variant: "delete",
    },
  ];

  const columns = [
    { id: "name", label: "Usuário" },
    { id: "accessType", label: "Tipo de Acesso" },
    { id: "management", label: "Gerência" },
    { id: "ativo", label: "Ativo" },
  ];

  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = Data.filter((user) =>
      user.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredData(filtered);
  };

  const toggleColumnVisibility = (columnId: keyof User) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  return (
    <div className="space-y-4">
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
      <h1 className="title-h1">Gerenciar Usuários</h1>
      <div className="flex justify-between">
        <Searchbar onSearch={handleSearch} />
        <div className="flex gap-3">
          <CrudUserForm onSuccess={fetchUsers} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">
                Colunas
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {columns.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={visibleColumns[column.id as keyof User]}
                  onCheckedChange={() =>
                    toggleColumnVisibility(column.id as keyof User)
                  }
                >
                  {column.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <DataTableUsers
        data={filteredData}
        actions={actions}
        visibleColumns={visibleColumns}
      />
      <Dialog open={editModalState.isOpen} onOpenChange={(isOpen) => !isOpen && closeEditModal()}>
        {editModalState.user && (
          <PutUserForm
            user={editModalState.user}
            onSuccess={handleSuccess}
            onError={handleError}
            onClose={closeEditModal}
          />
        )}
      </Dialog>
    </div>
  );
}
