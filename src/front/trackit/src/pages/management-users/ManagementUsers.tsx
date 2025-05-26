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
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  const actions: ActionButton[] = [
    {
      label: "Editar",
      onClick: (row) => {
        setSelectedUser(row);
        setIsEditModalOpen(true);
      },
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
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        {selectedUser && (
          <PutUserForm
            user={mapUserToUpdateUser(selectedUser as User & { matricula?: string })} // Explicitly map User to UpdateUser
            onSuccess={() => {
              fetchUsers();
              setSelectedUser(null);
              setIsEditModalOpen(false);
            }}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
      </Dialog>
    </div>
  );
}
