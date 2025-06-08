"use client";
import { useEffect, useState } from "react";
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
import { ArrowUpDown, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { TableSpinner } from "@/components/ui/spinner";
import { Searchbar } from "@/components/ui/SearchBar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
} from "@/components/ui/select";
import { getAllAnalysts, type IAnalyst } from "@/api/users";
import { getAllTickets, type ITicket } from "@/api/ticket";
import { getAllTicketTypes, type ITicketType } from "@/api/tickettype";

type AnalystRow = {
    name: string;
    demandasAtendidas: number;
    principalAtividade: string;
    desde: string;
};

export function DashboardDataTable() {
    const [data, setData] = useState<AnalystRow[]>([]);
    const [filteredData, setFilteredData] = useState<AnalystRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [principalAtividadeFilter, setPrincipalAtividadeFilter] = useState("__all__");
    const [filterMenuOpen, setFilterMenuOpen] = useState(false);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            getAllAnalysts(),
            getAllTickets(),
            getAllTicketTypes(),
        ]).then(([analysts, tickets, types]: [IAnalyst[], ITicket[], ITicketType[]]) => {
            const rows: AnalystRow[] = analysts.map(analyst => {
                // Chamados concluídos (dataFechamento != null)
                const ticketsByAnalyst = tickets.filter(
                    t => t.idAnalista && t.idAnalista === analyst.idUsuario && t.dataFechamento
                );
                // Conta por tipo de demanda
                const typeCount: Record<number, number> = {};
                ticketsByAnalyst.forEach(t => {
                    typeCount[t.idTipoChamado] = (typeCount[t.idTipoChamado] || 0) + 1;
                });
                // Tipo de demanda mais atendido
                let principalAtividade = "-";
                if (ticketsByAnalyst.length > 0) {
                    const maxTypeId = Object.entries(typeCount).sort((a, b) => b[1] - a[1])[0]?.[0];
                    const typeObj = types.find(tp => String(tp.idTipoChamado) === String(maxTypeId));
                    principalAtividade = typeObj ? typeObj.nomeTipo : `Tipo ${maxTypeId}`;
                }
                // Desde (dataCadastro do analista)
                let desde = "-";
                if (analyst.dataCadastro) {
                    const d = new Date(analyst.dataCadastro);
                    if (!isNaN(d.getTime())) {
                        desde = `${d.toLocaleString("default", { month: "long" })}/${d.getFullYear()}`;
                    }
                }
                return {
                    name: analyst.nomeUsuario,
                    demandasAtendidas: ticketsByAnalyst.length,
                    principalAtividade,
                    desde,
                };
            });
            setData(rows);
            setFilteredData(rows);
        }).finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        let filtered = data;
        if (search) {
            const lower = search.toLowerCase();
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(lower) ||
                item.principalAtividade.toLowerCase().includes(lower) ||
                item.desde.toLowerCase().includes(lower)
            );
        }
        if (principalAtividadeFilter !== "__all__") {
            filtered = filtered.filter(item => item.principalAtividade === principalAtividadeFilter);
        }
        setFilteredData(filtered);
    }, [search, data, principalAtividadeFilter]);

    const columns: ColumnDef<AnalystRow>[] = [
        {
            accessorKey: "name",
            header: ({ column }: { column: Column<AnalystRow, unknown> }) => (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Usuário
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
            cell: ({ row }: { row: Row<AnalystRow> }) => <span>{row.original.name}</span>,
        },
        {
            accessorKey: "demandasAtendidas",
            header: ({ column }: { column: Column<AnalystRow, unknown> }) => (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Demandas Atendidas
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
            cell: ({ row }: { row: Row<AnalystRow> }) => <span>{row.original.demandasAtendidas}</span>,
        },
        {
            accessorKey: "principalAtividade",
            header: ({ column }: { column: Column<AnalystRow, unknown> }) => (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Principal Atividade
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
            cell: ({ row }: { row: Row<AnalystRow> }) => <span>{row.original.principalAtividade}</span>,
        },
        {
            accessorKey: "desde",
            header: ({ column }: { column: Column<AnalystRow, unknown> }) => (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Desde
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
            cell: ({ row }: { row: Row<AnalystRow> }) => <span>{row.original.desde}</span>,
        },
    ];

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const principalAtividades = Array.from(
        new Set(data.map(d => d.principalAtividade).filter(a => a && a !== "-"))
    );

    return (
        <div className="space-y-4 w-full">
            <div className="flex justify-between">
                <Searchbar onSearch={setSearch} />
                <div className="flex gap-3">
                    <DropdownMenu open={filterMenuOpen} onOpenChange={setFilterMenuOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="outline">
                                <Filter className="w-4 h-4 mr-1" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="min-w-[220px]">
                            <div className="px-4 py-2 font-semibold text-sm text-gray-700">Principal Atividade</div>
                            <Select
                                value={principalAtividadeFilter}
                                onValueChange={setPrincipalAtividadeFilter}
                            >
                                <SelectTrigger className="w-full mb-2">
                                    <SelectValue placeholder="Todas" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="__all__">Todas</SelectItem>
                                        {principalAtividades.map((atividade) => (
                                            <SelectItem key={atividade} value={atividade}>
                                                {atividade}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div>
                {loading ? (
                    <TableSpinner />
                ) : (
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
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length} className="text-center py-6">Nenhum analista encontrado</td>
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
                )}
            </div>
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
