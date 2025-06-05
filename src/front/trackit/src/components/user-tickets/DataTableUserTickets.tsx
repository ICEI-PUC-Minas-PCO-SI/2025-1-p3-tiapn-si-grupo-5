import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type Column,
    type Row,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import type { UserTicketTableRow } from "../../pages/user-tickets/UserTickets";

interface DataTableUserTicketsProps {
    data: UserTicketTableRow[];
    visibleColumns: Record<string, boolean>;
}

export function DataTableUserTickets({
    data,
    visibleColumns,
}: DataTableUserTicketsProps) {
    const columns: ColumnDef<UserTicketTableRow>[] = [
        {
            accessorKey: "protocolo",
            header: ({ column }: { column: Column<UserTicketTableRow, unknown> }) => (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Protocolo
                    <ArrowUpDown
                        className={`ml-2 ${column.getIsSorted() === "asc"
                            ? "rotate-0"
                            : column.getIsSorted() === "desc"
                                ? "rotate-180"
                                : ""
                            }`}
                    />
                </Button>
            ),
            cell: ({ row }: { row: Row<UserTicketTableRow> }) => (
                <span>{row.original.protocolo || "-"}</span>
            ),
            enableHiding: true,
        },
        {
            accessorKey: "assunto",
            header: ({ column }: { column: Column<UserTicketTableRow, unknown> }) => (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Assunto
                    <ArrowUpDown
                        className={`ml-2 ${column.getIsSorted() === "asc"
                            ? "rotate-0"
                            : column.getIsSorted() === "desc"
                                ? "rotate-180"
                                : ""
                            }`}
                    />
                </Button>
            ),
            cell: ({ row }: { row: Row<UserTicketTableRow> }) => (
                <span className="max-w-[220px] truncate block">{row.original.assunto}</span>
            ),
            enableHiding: true,
        },
        {
            accessorKey: "dataAbertura",
            header: ({ column }: { column: Column<UserTicketTableRow, unknown> }) => (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Aberto em
                    <ArrowUpDown
                        className={`ml-2 ${column.getIsSorted() === "asc"
                            ? "rotate-0"
                            : column.getIsSorted() === "desc"
                                ? "rotate-180"
                                : ""
                            }`}
                    />
                </Button>
            ),
            cell: ({ row }: { row: Row<UserTicketTableRow> }) => {
                const data = row.original.dataAbertura ? new Date(row.original.dataAbertura) : null;
                const dataFormatada = data ? data.toLocaleDateString('pt-BR') : "";
                return <span>{dataFormatada}</span>;
            },
            enableHiding: true,
        },
        {
            accessorKey: "prioridade",
            header: ({ column }: { column: Column<UserTicketTableRow, unknown> }) => (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Prioridade
                    <ArrowUpDown
                        className={`ml-2 ${column.getIsSorted() === "asc"
                            ? "rotate-0"
                            : column.getIsSorted() === "desc"
                                ? "rotate-180"
                                : ""
                            }`}
                    />
                </Button>
            ),
            cell: ({ row }: { row: Row<UserTicketTableRow> }) => {
                const p = row.original.prioridade;
                let displayName = p?.nomePrioridade ?? "";
                if (displayName.length > 10) {
                    displayName = displayName.slice(0, 10) + "...";
                }
                return p ? (
                    <span
                        className="px-5 py-1 rounded paragraph text-base"
                        style={{
                            backgroundColor: p.hexCorPrimaria,
                            color: "#fff",
                            width: "110px",
                            maxWidth: "110px",
                            minWidth: "110px",
                            display: "inline-block",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        }}
                        title={p.nomePrioridade}
                    >
                        {displayName}
                    </span>
                ) : (
                    <span className="px-5 py-1 rounded bg-gray-200 text-gray-700 font-bold text-base">-</span>
                );
            },
            enableHiding: true,
            sortingFn: (a: Row<UserTicketTableRow>, b: Row<UserTicketTableRow>) => {
                const nameA = a.original.prioridade?.nomePrioridade?.toLowerCase() || "";
                const nameB = b.original.prioridade?.nomePrioridade?.toLowerCase() || "";
                return nameA.localeCompare(nameB);
            },
        },
        {
            accessorKey: "status",
            header: ({ column }: { column: Column<UserTicketTableRow, unknown> }) => (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown
                        className={`ml-2 ${column.getIsSorted() === "asc"
                            ? "rotate-0"
                            : column.getIsSorted() === "desc"
                                ? "rotate-180"
                                : ""
                            }`}
                    />
                </Button>
            ),
            cell: ({ row }: { row: Row<UserTicketTableRow> }) => {
                const s = row.original.status;
                let displayName = s?.nomeStatus ?? "";
                if (displayName.length > 10) {
                    displayName = displayName.slice(0, 10) + "...";
                }
                return s ? (
                    <span
                        className="px-5 py-1 rounded paragraph text-base"
                        style={{
                            backgroundColor: s.hexCorPrimaria,
                            color: "#fff",
                            width: "110px",
                            maxWidth: "110px",
                            minWidth: "110px",
                            display: "inline-block",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        }}
                        title={s.nomeStatus}
                    >
                        {displayName}
                    </span>
                ) : (
                    <span className="px-5 py-1 rounded bg-gray-200 text-gray-700 font-bold text-base">-</span>
                );
            },
            enableHiding: true,
            sortingFn: (a: Row<UserTicketTableRow>, b: Row<UserTicketTableRow>) => {
                const nameA = a.original.status?.nomeStatus?.toLowerCase() || "";
                const nameB = b.original.status?.nomeStatus?.toLowerCase() || "";
                return nameA.localeCompare(nameB);
            },
        },
        {
            accessorKey: "analista",
            header: ({ column }: { column: Column<UserTicketTableRow, unknown> }) => (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Analista
                    <ArrowUpDown
                        className={`ml-2 ${column.getIsSorted() === "asc"
                            ? "rotate-0"
                            : column.getIsSorted() === "desc"
                                ? "rotate-180"
                                : ""
                            }`}
                    />
                </Button>
            ),
            cell: ({ row }: { row: Row<UserTicketTableRow> }) => (
                <span>{row.original.analista || "-"}</span>
            ),
            enableHiding: true,
        },
        {
            id: "actions",
            header: "Ações",
            cell: () => (
                <div className="flex justify-center gap-2">
                    <Button variant="outlineDisabled" size="icon">
                        <Eye className="w-4 h-4" />
                    </Button>
                </div>
            ),
            enableHiding: false,
        },
    ].filter(
        (column) => visibleColumns[column.accessorKey as keyof UserTicketTableRow] ?? true
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="w-full">
            <table className="w-full border rounded bg-white">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="bg-gray-100 text-gray-700">
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="text-center px-4 py-2"
                                    style={{ width: `${100 / columns.length}%` }}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="text-center py-6">Nenhum chamado encontrado</td>
                        </tr>
                    ) : (
                        table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="border-t hover:bg-gray-50">
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className="text-center px-4 py-2"
                                        style={{ width: `${100 / columns.length}%` }}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className="flex items-center justify-between py-4">
                <span className="text-sm text-muted-foreground">
                    Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                </span>
                <div className="flex gap-3">
                    <Button
                        size="icon"
                        variant="outline"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                        size="icon"
                        variant="outline"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
