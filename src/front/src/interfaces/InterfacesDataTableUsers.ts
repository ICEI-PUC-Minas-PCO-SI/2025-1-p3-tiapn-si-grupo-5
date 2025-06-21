import type { ColumnDef } from "@tanstack/react-table";

export interface User {
    id: string;
    name: string;
    accessType: string;
    management: {
        idGerencia: number;
        nomeGerencia: string;
    };
    ativo: number;
    nomeUsuario: string;
    email: string;
    ramal: string;
    matricula: string;
}

export interface DataTableProps<T> {
    data: T[];
    columns: ColumnDef<T>[];
}

export interface ActionButton {
    label: string | ((row: User) => string);
    onClick: (row: User) => void;
    variant?: "default" | "outline" | "delete" | "active" | ((row: User) => "default" | "outline" | "delete" | "active");
}
