"use client";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    type ColumnDef,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { User, ActionButton } from "./InterfacesDataTableUsers";

export function DataTableUsers({
    data,
    actions,
}: {
    data: User[];
    actions: ActionButton[];
}) {
    const columns: ColumnDef<User>[] = [
        {
            accessorKey: "name",
            header: "Usuário",
            cell: ({ row }) => <span>{row.original.name}</span>,
        },
        {
            accessorKey: "accessType",
            header: "Tipo de Acesso",
            cell: ({ row }) => <span>{row.original.accessType}</span>,
        },
        {
            accessorKey: "management",
            header: "Gerência",
            cell: ({ row }) => <span>{row.original.management}</span>,
        },
        {
            id: "actions",
            header: "Ações",
            cell: ({ row }) => (
                <div className="flex justify-center gap-2">
                    {actions.map((action, index) => (
                        <Button
                            key={index}
                            variant={action.variant || "default"}
                            size="sm"
                            onClick={() => action.onClick(row.original)}
                        >
                            {action.label}
                        </Button>
                    ))}
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="w-full">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    key={header.id}
                                    className="text-center px-4 py-2"
                                    style={{ width: `${100 / columns.length}%` }}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell
                                    key={cell.id}
                                    className="text-center px-4 py-2"
                                    style={{ width: `${100 / columns.length}%` }}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
