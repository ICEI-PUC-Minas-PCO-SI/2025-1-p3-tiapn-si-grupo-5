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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CrudUserForm } from "@/components/CrudUserForm";
import type { User, ActionButton } from "@/components/InterfacesDataTableUsers";
import { getAllUsers } from "@/api/users";
import { toast } from "sonner";

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
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const users = await getAllUsers();
      console.log("Dados retornados da API:", users);

      const formattedUsers = users.map((user) => ({
        id: user.idUsuario.toString(),
        name: user.nomeUsuario,
        accessType:
          user.idTipoUsuario === 1
            ? "Gestor"
            : user.idTipoUsuario === 2
              ? "Analista"
              : "Usuário",
        management: `Gerência ${user.idGerencia}`,
      }));
      setData(formattedUsers);
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

  const handleUserCreation = async (success: boolean) => {
    setIsModalOpen(false);
    if (success) {
      toast.success("Usuário criado com sucesso!");
      await fetchUsers();
    } else {
      toast.error("Erro ao criar usuário. Verifique os dados e tente novamente.");
    }
  };

  const actions: ActionButton[] = [
    {
      label: "Editar",
      onClick: (row) => console.log("Editando:", row),
      variant: "outline",
    },
    {
      label: "Excluir",
      onClick: (row) => console.log("Excluindo:", row),
      variant: "delete",
    },
  ];

  const columns = [
    { id: "name", label: "Usuário" },
    { id: "accessType", label: "Tipo de Acesso" },
    { id: "management", label: "Gerência" },
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
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button size="sm">Criar</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Usuário</DialogTitle>
              </DialogHeader>
              <CrudUserForm onSubmit={handleUserCreation} />
            </DialogContent>
          </Dialog>
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
    </div>
  );
}
