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
import { ArrowUpDown, ChevronLeft, ChevronRight, Filter, XCircle } from "lucide-react";
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
import { getDashboardSummary } from "@/api/dashboard";
import type { ITicket } from "@/api/ticket";
import type { ITicketType } from "@/api/tickettype";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type AnalystRow = {
    name: string;
    demandasAtendidas: number;
    principalAtividade: string;
    desde: string;
    ano: string;
    anosAtendidos: string[];
};

export function DashboardDataTable() {
    const [data, setData] = useState<AnalystRow[]>([]);
    const [filteredData, setFilteredData] = useState<AnalystRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [principalAtividadeFilter, setPrincipalAtividadeFilter] = useState("__all__");
    const [yearFilter, setYearFilter] = useState("__all__");
    const [filterMenuOpen, setFilterMenuOpen] = useState(false);

    const [anosDisponiveis, setAnosDisponiveis] = useState<string[]>([]);
    const [allTickets, setAllTickets] = useState<ITicket[]>([]);
    const [analysts, setAnalysts] = useState<IAnalyst[]>([]);
    const [ticketTypes, setTicketTypes] = useState<ITicketType[]>([]);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            getAllAnalysts(),
            getDashboardSummary(), // Busca tickets e tipos de chamados juntos
        ]).then(([analystsRes, dashboardSummary]: [IAnalyst[], { tickets: ITicket[], ticketTypes: ITicketType[] }]) => {
            setAnalysts(analystsRes);
            setAllTickets(dashboardSummary.tickets);
            setTicketTypes(dashboardSummary.ticketTypes);

            const anosSet = new Set<string>();
            dashboardSummary.tickets.forEach(t => {
                if (t.idAnalista && t.dataFechamento) {
                    const year = String(new Date(t.dataFechamento).getFullYear());
                    anosSet.add(year);
                }
            });
            const anosArr = Array.from(anosSet).sort((a, b) => Number(b) - Number(a));
            setAnosDisponiveis(anosArr);

            setData(buildAnalystRows(analystsRes, dashboardSummary.tickets, dashboardSummary.ticketTypes, "__all__"));
            setFilteredData(buildAnalystRows(analystsRes, dashboardSummary.tickets, dashboardSummary.ticketTypes, "__all__"));
        }).finally(() => setLoading(false));
    }, []);

    // Função para montar as linhas da tabela de acordo com o filtro de ano
    function buildAnalystRows(
        analysts: IAnalyst[],
        tickets: ITicket[],
        types: ITicketType[],
        year: string
    ): AnalystRow[] {
        // Map: idAnalista -> tickets concluídos (todos os anos)
        const analistaTicketsMap = new Map<number, ITicket[]>();
        // Map: idAnalista -> Map<ano, ITicket[]>
        const analistaAnoTicketsMap = new Map<number, Map<string, ITicket[]>>();
        // Map: idAnalista -> Set<ano>
        const analistaAnosMap = new Map<number, Set<string>>();

        tickets.forEach(t => {
            if (t.idAnalista && t.dataFechamento) {
                const idAnalista = t.idAnalista;
                const yearTicket = String(new Date(t.dataFechamento).getFullYear());

                // Todos os tickets do analista
                if (!analistaTicketsMap.has(idAnalista)) analistaTicketsMap.set(idAnalista, []);
                analistaTicketsMap.get(idAnalista)!.push(t);

                // Tickets do analista por ano
                if (!analistaAnoTicketsMap.has(idAnalista)) analistaAnoTicketsMap.set(idAnalista, new Map());
                if (!analistaAnoTicketsMap.get(idAnalista)!.has(yearTicket)) analistaAnoTicketsMap.get(idAnalista)!.set(yearTicket, []);
                analistaAnoTicketsMap.get(idAnalista)!.get(yearTicket)!.push(t);

                // Anos em que o analista atendeu chamados
                if (!analistaAnosMap.has(idAnalista)) analistaAnosMap.set(idAnalista, new Set());
                analistaAnosMap.get(idAnalista)!.add(yearTicket);
            }
        });

        return analysts.map(analyst => {
            let ticketsByAnalyst: ITicket[] = [];
            if (year !== "__all__") {
                // Corrige: pega apenas os tickets do analista naquele ano
                ticketsByAnalyst = analistaAnoTicketsMap.get(analyst.idUsuario)?.get(year) || [];
            } else {
                ticketsByAnalyst = analistaTicketsMap.get(analyst.idUsuario) || [];
            }
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
            let ano = "-";
            if (analyst.dataCadastro) {
                const d = new Date(analyst.dataCadastro);
                if (!isNaN(d.getTime())) {
                    desde = `${d.toLocaleString("default", { month: "long" })}/${d.getFullYear()}`;
                    ano = String(d.getFullYear());
                }
            }
            return {
                name: analyst.nomeUsuario,
                demandasAtendidas: ticketsByAnalyst.length,
                principalAtividade,
                desde,
                ano,
                anosAtendidos: Array.from(analistaAnosMap.get(analyst.idUsuario) || []),
            };
        });
    }

    // Atualiza os dados da tabela ao mudar o filtro de ano
    useEffect(() => {
        setData(buildAnalystRows(analysts, allTickets, ticketTypes, yearFilter));
    }, [yearFilter, analysts, allTickets, ticketTypes]);

    // Atualiza os dados filtrados ao mudar qualquer filtro
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
        if (yearFilter !== "__all__") {
            filtered = filtered.filter(item =>
                item.anosAtendidos.includes(yearFilter)
            );
        }
        setFilteredData(filtered);
    }, [search, data, principalAtividadeFilter, yearFilter]);

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
            cell: ({ row }: { row: Row<AnalystRow> }) => (
                <span
                    className="block truncate"
                    style={{
                        width: "180px",
                        maxWidth: "180px",
                        minWidth: "180px",
                        display: "inline-block",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}
                >
                    {row.original.name}
                </span>
            ),
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
            cell: ({ row }: { row: Row<AnalystRow> }) => (
                <span
                    className="block truncate"
                    style={{
                        width: "180px",
                        maxWidth: "180px",
                        minWidth: "180px",
                        display: "inline-block",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}
                >
                    {row.original.principalAtividade}
                </span>
            ),
        },
        {
            accessorKey: "desde",
            header: ({ column }: { column: Column<AnalystRow, unknown> }) => (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Na equipe desde
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

    // Função para limpar filtro de principal atividade e ano
    const clearFilters = () => {
        setPrincipalAtividadeFilter("__all__");
        setYearFilter("__all__");
        setFilterMenuOpen(false);
    };

    // Adicione o console.log aqui para depuração
    useEffect(() => {
        console.log("DashboardDataTable - filteredData:", filteredData);
    }, [filteredData]);

    return (
        <div className="space-y-4 w-full">
            <div className="flex justify-between">
                <Searchbar onSearch={setSearch} />
                <div className="flex gap-3">
                    <DropdownMenu open={filterMenuOpen} onOpenChange={setFilterMenuOpen}>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <DropdownMenuTrigger asChild>
                                        <Button size="icon" variant="outline">
                                            <Filter className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Filtrar
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <DropdownMenuContent align="end" className="min-w-[220px]">
                            <div className="px-4 py-2 font-semibold text-sm text-gray-700 dark:text-white">Principal Atividade</div>
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
                            <div className="px-4 py-2 font-semibold text-sm text-gray-700 dark:text-white">Ano</div>
                            <Select
                                value={yearFilter}
                                onValueChange={setYearFilter}
                            >
                                <SelectTrigger className="w-full mb-2">
                                    <SelectValue placeholder="Todos" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="__all__">Todos</SelectItem>
                                        {anosDisponiveis.map((ano) => (
                                            <SelectItem key={ano} value={ano}>
                                                {ano}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <div className="flex justify-center px-2 pb-2">
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={clearFilters}
                                    className="flex items-center gap-1 dark:text-white"
                                    disabled={principalAtividadeFilter === "__all__" && yearFilter === "__all__"}
                                >
                                    <XCircle className="w-4 h-4 dark:text-white" />
                                    <span className="dark:text-white">Limpar filtros</span>
                                </Button>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div>
                {loading ? (
                    <TableSpinner />
                ) : (
                    <table className="w-full border rounded bg-white text-sm dark:bg-slate-900 dark:text-slate-200">
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id} className="bg-gray-100 text-gray-700 dark:bg-slate-800">
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className={`text-center px-4 py-2 ${header.column.getCanSort() ? "group" : ""} ${header.id === "actions" ? "dark:text-white" : ""}`}
                                            style={{ width: `${100 / columns.length}%` }}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : (
                                                    <div className={header.column.getCanSort() ? "dark:text-slate-200" : ""}>
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
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
                                    <td colSpan={columns.length} className="text-center py-6 dark:bg-slate-900 dark:text-slate-200">Nenhum analista encontrado</td>
                                </tr>
                            ) : (
                                table.getRowModel().rows.map((row) => (
                                    <tr key={row.id} className="border-t hover:bg-gray-50 dark:hover:bg-slate-800">
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
