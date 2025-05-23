import { useState } from "react";
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
    const initialData: User[] = [
        {
            id: "1",
            name: "Fulano",
            accessType: "Cliente",
            management: "Gerência X",
        },
        { id: "2", name: "Ciclano", accessType: "Analista", management: "ASTIN" },
    ];

    const [filteredData, setFilteredData] = useState<User[]>(initialData);

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
        const filtered = initialData.filter((user) =>
            user.name.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredData(filtered);
    };

    return (
        <div className="space-y-4">
            <h1 className="title-h1">Gerenciar Usuários</h1>
            <div className="flex justify-between">
                <Searchbar onSearch={handleSearch} />
                <div className="flex gap-3">
                    <Button size="sm">Criar</Button>
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
                                    checked={true}
                                    onCheckedChange={(value) =>
                                        console.log(`Toggle column ${column.id}: ${value}`)
                                    }
                                >
                                    {column.label}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <DataTableUsers data={filteredData} actions={actions} />
        </div>
    );
}
