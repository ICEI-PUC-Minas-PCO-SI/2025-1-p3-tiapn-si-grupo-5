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
import { Badge } from "@/components/ui/badge";
import type { UserTicketTableRow } from "../../pages/user-tickets/UserTickets";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUnreadChamados } from "@/api/notifications";
import { useUser } from "@/contexts/UserContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DataTableUserTicketsProps {
    data: UserTicketTableRow[];
    visibleColumns: Record<string, boolean>;
}

export function DataTableUserTickets({
    data,
    visibleColumns,
}: DataTableUserTicketsProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useUser();
    const [unreadChamados, setUnreadChamados] = useState<number[]>([]);

    useEffect(() => {
        if (!user?.id) return;
        getUnreadChamados(user.id)
            .then(setUnreadChamados)
            .catch(() => setUnreadChamados([]));
    }, [user?.id]);

    // Helper para montar o prefixo correto da rota
    function getRoutePrefix() {
        if (location.pathname.startsWith("/admin/")) return "/admin";
        if (location.pathname.startsWith("/analyst/")) return "/analyst";
        if (location.pathname.startsWith("/user/")) return "/user";
        return "";
    }

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
                <span
                    className="block truncate"
                    style={{
                        width: "220px",
                        maxWidth: "220px",
                        minWidth: "220px",
                        display: "inline-block",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}
                >
                    {row.original.assunto}
                </span>
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
                return (
                    <div className="flex justify-center">
                        {p ? (
                            <Badge
                                className="text-sm px-3 py-1 rounded w-[110px] max-w-[110px] min-w-[110px] inline-block overflow-hidden text-ellipsis whitespace-nowrap"
                                style={{
                                    backgroundColor: p.hexCorPrimaria,
                                    color: p.hexCorSecundaria,
                                    border: "1px solid #e5e7eb"
                                }}
                                title={p.nomePrioridade}
                            >
                                {displayName}
                            </Badge>
                        ) : (
                            <Badge
                                className="text-sm px-3 py-1 rounded w-[110px] max-w-[110px] min-w-[110px] font-bold bg-gray-200 text-slate-700"
                            >-</Badge>
                        )}
                    </div>
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
                return (
                    <div className="flex justify-center">
                        {s ? (
                            <Badge
                                className="text-sm px-3 py-1 rounded w-[110px] max-w-[110px] min-w-[110px] inline-block overflow-hidden text-ellipsis whitespace-nowrap"
                                style={{
                                    backgroundColor: s.hexCorPrimaria,
                                    color: s.hexCorSecundaria,
                                    border: "1px solid #e5e7eb"
                                }}
                                title={s.nomeStatus}
                            >
                                {displayName}
                            </Badge>
                        ) : (
                            <Badge
                                className="text-sm px-3 py-1 rounded w-[110px] max-w-[110px] min-w-[110px] font-bold bg-gray-200 text-slate-700"
                            >-</Badge>
                        )}
                    </div>
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
            cell: ({ row }: { row: Row<UserTicketTableRow> }) => (
                <div className="flex justify-center gap-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => {
                                        const prefix = getRoutePrefix();
                                        navigate(`${prefix}/chat?idChamado=${row.original.idChamado}`);
                                    }}
                                    style={{ position: "relative" }}
                                >
                                    <Eye className="w-4 h-4" />
                                    {unreadChamados.includes(row.original.idChamado) && (
                                        <span
                                            style={{
                                                position: "absolute",
                                                top: 6,
                                                right: 6,
                                                width: 10,
                                                height: 10,
                                                borderRadius: "50%",
                                                background: "#2563eb",
                                                display: "inline-block"
                                            }}
                                            aria-label="Notificações não lidas"
                                        />
                                    )}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                Visualizar chat
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
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
        initialState: {
            sorting: [
                { id: "dataAbertura", desc: true }
            ]
        }
    });

    return (
        <div className="w-full max-w-full overflow-hidden xl:overflow-visible">
            <div className="w-full overflow-x-auto xl:overflow-x-visible">
                <table className="w-full min-w-[700px] xl:min-w-0 border rounded bg-white text-sm dark:bg-slate-900 dark:text-slate-200">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="bg-gray-100 text-gray-700 dark:bg-slate-800">
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className={`text-center px-2 md:px-4 py-2 ${header.column.getCanSort() ? "group" : ""} ${header.id === "actions" ? "dark:text-white" : ""}`}
                                        style={{ width: `${100 / columns.length}%` }}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : (
                                                <div className={header.column.getCanSort() ? "dark:text-slate-200" : ""}>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                </div>
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-6 dark:bg-slate-900 dark:text-slate-200">Nenhum chamado encontrado</td>
                            </tr>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <tr key={row.id} className="border-t hover:bg-gray-50 dark:hover:bg-slate-800">
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            key={cell.id}
                                            className="text-center px-2 md:px-4 py-2"
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
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 gap-3">
                <span className="text-sm text-muted-foreground text-center sm:text-left">
                    Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                </span>
                <div className="flex gap-3 justify-center sm:justify-end">
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