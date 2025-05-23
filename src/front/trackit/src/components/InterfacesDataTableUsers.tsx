import type { ColumnDef } from "@tanstack/react-table";

export interface User {
    id: string;
    name: string;
    accessType: string;
    management: string;
}

export interface DataTableProps<T> {
    data: T[];
    columns: ColumnDef<T>[];
}

export interface ActionButton {
    label: string;
    onClick: (row: User) => void;
    variant?: "default" | "outline" | "delete";
}
