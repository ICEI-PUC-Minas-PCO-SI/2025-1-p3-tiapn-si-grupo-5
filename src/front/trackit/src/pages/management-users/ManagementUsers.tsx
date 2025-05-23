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
import type { User, ActionButton } from "@/components/InterfacesDataTableUsers";

export function ManagementUsers() {
  const [Data, setData] = useState<User[]>([
    {
      id: "1",
      name: "Fulano",
      accessType: "Cliente",
      management: "Gerência X",
    },
    { id: "2", name: "Ciclano", accessType: "Analista", management: "ASTIN" },
    {
      id: "3",
      name: "Beltrano",
      accessType: "Supervisor",
      management: "ASTIN",
    },
    {
      id: "3",
      name: "Beltrano",
      accessType: "Supervisor",
      management: "ASTIN",
    },
    {
      id: "3",
      name: "Beltrano",
      accessType: "Supervisor",
      management: "ASTIN",
    },
    {
      id: "3",
      name: "Beltrano",
      accessType: "Supervisor",
      management: "ASTIN",
    },
    {
      id: "3",
      name: "Beltrano",
      accessType: "Supervisor",
      management: "ASTIN",
    },
    {
      id: "3",
      name: "Beltrano",
      accessType: "Supervisor",
      management: "ASTIN",
    },
    {
      id: "3",
      name: "Beltrano",
      accessType: "Supervisor",
      management: "ASTIN",
    },
    { id: "3", name: "Lucas", accessType: "Supervisor", management: "ASTIN" },
    { id: "3", name: "Lucas", accessType: "Supervisor", management: "ASTIN" },
    { id: "3", name: "Lucas", accessType: "Supervisor", management: "ASTIN" },
    { id: "3", name: "Lucas", accessType: "Supervisor", management: "ASTIN" },
  ]);

  const [filteredData, setFilteredData] = useState<User[]>(Data);
  const [visibleColumns, setVisibleColumns] = useState<
    Record<keyof User, boolean>
  >({
    id: true,
    name: true,
    accessType: true,
    management: true,
  });

  useEffect(() => {
    setFilteredData(Data);
  }, [Data]);

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
          <Button
            size="sm"
            onClick={() =>
              setData([
                ...Data,
                {
                  id: `${Data.length + 1}`,
                  name: "Novo Usuário",
                  accessType: "Novo",
                  management: "Nova Gerência",
                },
              ])
            }
          >
            Criar
          </Button>
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
