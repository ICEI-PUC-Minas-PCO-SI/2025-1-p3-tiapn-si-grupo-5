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
import { getAllTickets, type ITicket } from "@/api/ticket";
import { getAllTicketTypes, type ITicketType } from "@/api/tickettype";

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
            getAllTickets(),
            getAllTicketTypes(),
        ]).then(([analystsRes, ticketsRes, typesRes]: [IAnalyst[], ITicket[], ITicketType[]]) => {
            setAnalysts(analystsRes);
            setAllTickets(ticketsRes);
            setTicketTypes(typesRes);

            const anosSet = new Set<string>();
            ticketsRes.forEach(t => {
                if (t.idAnalista && t.dataFechamento) {
                    const year = String(new Date(t.dataFechamento).getFullYear());
                    anosSet.add(year);
                }
            });
            const anosArr = Array.from(anosSet).sort((a, b) => Number(b) - Number(a));
            setAnosDisponiveis(anosArr);

            setData(buildAnalystRows(analystsRes, ticketsRes, typesRes, "__all__"));
            setFilteredData(buildAnalystRows(analystsRes, ticketsRes, typesRes, "__all__"));
        }).finally(() => setLoading(false));
    }, []);

    function buildAnalystRows(
        analysts: IAnalyst[],
        tickets: ITicket[],
        types: ITicketType[],
        year: string
    ): AnalystRow[] {
        const analistaTicketsMap = new Map<number, ITicket[]>();
        const analistaAnoTicketsMap = new Map<number, Map<string, ITicket[]>>();
        const analistaAnosMap = new Map<number, Set<string>>();

        tickets.forEach(t => {
            if (t.idAnalista && t.dataFechamento) {
                const idAnalista = t.idAnalista;
                const yearTicket = String(new Date(t.dataFechamento).getFullYear());

                if (!analistaTicketsMap.has(idAnalista)) analistaTicketsMap.set(idAnalista, []);
                analistaTicketsMap.get(idAnalista)!.push(t);

                if (!analistaAnoTicketsMap.has(idAnalista)) analistaAnoTicketsMap.set(idAnalista, new Map());
                if (!analistaAnoTicketsMap.get(idAnalista)!.has(yearTicket)) analistaAnoTicketsMap.get(idAnalista)!.set(yearTicket, []);
                analistaAnoTicketsMap.get(idAnalista)!.get(yearTicket)!.push(t);

                if (!analistaAnosMap.has(idAnalista)) analistaAnosMap.set(idAnalista, new Set());
                analistaAnosMap.get(idAnalista)!.add(yearTicket);
            }
        });

        return analysts.map(analyst => {
            let ticketsByAnalyst: ITicket[] = [];
            if (year !== "__all__") {
                ticketsByAnalyst = (analistaTicketsMap.get(analyst.idUsuario) || []).filter(t => {
                    if (!t.dataFechamento) return false;
                    const fechamento = new Date(t.dataFechamento);
                    const abertura = t.dataAbertura ? new Date(t.dataAbertura) : null;
                    const anoFechamento = fechamento.getFullYear();
                    const anoFiltro = parseInt(year, 10);
                    const entraNoAno = anoFechamento === anoFiltro;

                    if (entraNoAno) {
                        console.log(
                            `[DEBUG] Chamado ${t.idChamado} - Abertura: ${abertura?.toLocaleDateString()} (${abertura?.getFullYear()}) | Fechamento: ${fechamento.toLocaleDateString()} (${anoFechamento}) | Ano filtro: ${anoFiltro}`
                        );
                    }
                    return entraNoAno;
                });
                console.log(
                    `[DashboardDataTable] Demandas atendidas por ${analyst.nomeUsuario} (${analyst.idUsuario}) no ano ${year}:`,
                    ticketsByAnalyst.length,
                    ticketsByAnalyst
                );
            } else {
                ticketsByAnalyst = analistaTicketsMap.get(analyst.idUsuario) || [];
            }
            const typeCount: Record<number, number> = {};
            ticketsByAnalyst.forEach(t => {
                typeCount[t.idTipoChamado] = (typeCount[t.idTipoChamado] || 0) + 1;
            });
            let principalAtividade = "-";
            if (ticketsByAnalyst.length > 0) {
                const maxTypeId = Object.entries(typeCount).sort((a, b) => b[1] - a[1])[0]?.[0];
                const typeObj = types.find(tp => String(tp.idTipoChamado) === String(maxTypeId));
                principalAtividade = typeObj ? typeObj.nomeTipo : `Tipo ${maxTypeId}`;
            }
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

    useEffect(() => {
        setData(buildAnalystRows(analysts, allTickets, ticketTypes, yearFilter));
    }, [yearFilter, analysts, allTickets, ticketTypes]);

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
                        <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="outline">
                                <Filter className="w-4 h-4" />
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
                            <div className="px-4 py-2 font-semibold text-sm text-gray-700">Ano</div>
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
                                    className="flex items-center gap-1"
                                    disabled={principalAtividadeFilter === "__all__" && yearFilter === "__all__"}
                                >
                                    <XCircle className="w-4 h-4" />
                                    Limpar filtros
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
                    <table className="w-full border rounded bg-white text-sm">
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
