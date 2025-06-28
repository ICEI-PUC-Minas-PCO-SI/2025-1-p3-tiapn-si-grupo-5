import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getTeamTickets } from "@/api/ticket";
import type { ITicket } from "@/api/ticket";
import { getAllPriorities } from "@/api/priority";
import type { IPriority } from "@/api/priority";
import { getAllStatus } from "@/api/status";
import type { IStatus } from "@/api/status";
import { getAllUsers } from "@/api/users";
import type { IUserListItem } from "@/api/users";
import { Button } from "@/components/ui/button";
import { GlobalAlert } from "@/components/ui/GlobalAlert";
import { Searchbar } from "@/components/ui/SearchBar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import { DataTableUserTickets } from "@/components/user-tickets/DataTableUserTickets";
import { XCircle } from "lucide-react";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
} from "@/components/ui/select";
import { TableSpinner } from "@/components/ui/spinner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface TeamTicketTableRow {
    idChamado: number;
    protocolo?: string;
    assunto: string;
    dataAbertura: string;
    prioridade: {
        idPrioridade: number;
        nomePrioridade: string;
        hexCorPrimaria: string;
        hexCorSecundaria: string;
    };
    status: {
        idStatus: number;
        nomeStatus: string;
        hexCorPrimaria: string;
        hexCorSecundaria: string;
    };
    analista?: string;
}

export function AdminTeamTickets() {
    const [tickets, setTickets] = useState<TeamTicketTableRow[]>([]);
    const [filteredData, setFilteredData] = useState<TeamTicketTableRow[]>([]);
    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [allPriorities, setAllPriorities] = useState<IPriority[]>([]);
    const [allStatus, setAllStatus] = useState<IStatus[]>([]);
    const [filterOpen, setFilterOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    // Query params
    const [searchParams, setSearchParams] = useSearchParams();

    // Filtros controlados por query params
    const search = searchParams.get("search") || "";
    const priorityFilter = searchParams.get("priority") || "__all__";
    const statusFilter = searchParams.get("status") || "__all__";
    const yearAberturaFilter = searchParams.get("yearAbertura") || "__all__";

    // Anos disponíveis de abertura
    const anosAberturaDisponiveis = useMemo(() => {
        return Array.from(
            new Set(
                tickets
                    .map(t => {
                        if (!t.dataAbertura) return undefined;
                        const year = new Date(t.dataAbertura).getFullYear();
                        return isNaN(year) ? undefined : year;
                    })
                    .filter((y): y is number => typeof y === "number")
            )
        )
            .sort((a, b) => b - a)
            .map(String);
    }, [tickets]);

    useEffect(() => {
        setLoading(true);
        Promise.all([getTeamTickets(), getAllPriorities(), getAllStatus(), getAllUsers()])
            .then(([ticketsData, priorities, statuses, users]: [
                ITicket[],
                IPriority[],
                IStatus[],
                IUserListItem[]
            ]) => {
                setAllPriorities(priorities);
                setAllStatus(statuses);

                const mapped: TeamTicketTableRow[] = ticketsData.map((t) => {
                    let formattedProtocolo = "";
                    if (t.protocolo && t.protocolo.length === 8) {
                        const num = t.protocolo.slice(0, 6);
                        const ano = t.protocolo.slice(6, 8);
                        formattedProtocolo = `#${num}/${ano}`;
                    } else {
                        formattedProtocolo = t.protocolo || "";
                    }
                    const prioridadeObj = priorities.find(p => p.idPrioridade === t.idPrioridade) || {
                        idPrioridade: t.idPrioridade,
                        nomePrioridade: "Não Definida",
                        hexCorPrimaria: "#888",
                        hexCorSecundaria: "#fff"
                    };
                    const statusObj = statuses.find(s => s.idStatus === t.idStatus) || {
                        idStatus: t.idStatus ?? 0,
                        nomeStatus: "Em aberto",
                        hexCorPrimaria: "#888",
                        hexCorSecundaria: "#fff"
                    };
                    const analistaName = t.idAnalista
                        ? (users.find(u => u.id === String(t.idAnalista))?.name ?? "-")
                        : "-";
                    return {
                        idChamado: t.idChamado,
                        protocolo: formattedProtocolo,
                        assunto: t.assunto,
                        dataAbertura: t.dataAbertura,
                        prioridade: {
                            idPrioridade: prioridadeObj.idPrioridade,
                            nomePrioridade: prioridadeObj.nomePrioridade,
                            hexCorPrimaria: prioridadeObj.hexCorPrimaria,
                            hexCorSecundaria: prioridadeObj.hexCorSecundaria || "#fff"
                        },
                        status: {
                            idStatus: statusObj.idStatus,
                            nomeStatus: statusObj.nomeStatus,
                            hexCorPrimaria: statusObj.hexCorPrimaria,
                            hexCorSecundaria: statusObj.hexCorSecundaria || "#fff"
                        },
                        analista: analistaName
                    };
                });
                setTickets(mapped);
                setAlert(null);
                setLoading(false);
            })
            .catch(() => {
                setTickets([]);
                setFilteredData([]);
                setAlert({ type: "error", message: "Erro ao buscar chamados ou parâmetros." });
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    useEffect(() => {
        let data = tickets;
        const lowerCaseQuery = search.toLowerCase();
        if (search) {
            data = data.filter(
                (ticket) =>
                    ticket.assunto.toLowerCase().includes(lowerCaseQuery) ||
                    (ticket.protocolo ?? "").toLowerCase().includes(lowerCaseQuery)
            );
        }
        if (priorityFilter && priorityFilter !== "__all__") {
            data = data.filter((ticket) =>
                String(ticket.prioridade.idPrioridade) === priorityFilter
            );
        }
        if (statusFilter && statusFilter !== "__all__") {
            data = data.filter((ticket) =>
                String(ticket.status.idStatus) === statusFilter
            );
        }
        if (yearAberturaFilter && yearAberturaFilter !== "__all__") {
            data = data.filter((ticket) => {
                if (!ticket.dataAbertura) return false;
                const year = new Date(ticket.dataAbertura).getFullYear();
                return String(year) === yearAberturaFilter;
            });
        }
        setFilteredData(data);
    }, [search, tickets, priorityFilter, statusFilter, yearAberturaFilter]);

    // Prioridades presentes nos chamados
    const prioritiesInTickets = Array.from(
        new Set(tickets.map((t) => t.prioridade.idPrioridade))
    );
    const prioritiesToShow = allPriorities.filter((p) =>
        prioritiesInTickets.includes(p.idPrioridade)
    );

    // Status presentes nos chamados
    const statusInTickets = Array.from(
        new Set(tickets.map((t) => t.status.idStatus))
    );
    const statusToShow = allStatus.filter((s) =>
        statusInTickets.includes(s.idStatus)
    );

    // Limpar ambos filtros e fechar modal
    const clearFilters = () => {
        setSearchParams(params => {
            params.delete("priority");
            params.delete("status");
            params.delete("yearAbertura");
            return params;
        });
        setFilterOpen(false);
    };

    // Handler para Select de prioridade
    const handlePriorityChange = (value: string) => {
        setSearchParams(params => {
            if (value === "__all__") {
                params.delete("priority");
            } else {
                params.set("priority", value);
            }
            return params;
        });
    };

    // Handler para Select de status
    const handleStatusChange = (value: string) => {
        setSearchParams(params => {
            if (value === "__all__") {
                params.delete("status");
            } else {
                params.set("status", value);
            }
            return params;
        });
    };

    // Handler para Select de ano de abertura
    const handleYearAberturaChange = (value: string) => {
        setSearchParams(params => {
            if (value === "__all__") {
                params.delete("yearAbertura");
            } else {
                params.set("yearAbertura", value);
            }
            return params;
        });
    };

    const handleSearch = (query: string) => {
        setSearchParams(params => {
            if (query) {
                params.set("search", query);
            } else {
                params.delete("search");
            }
            return params;
        });
    };

    return (
        <div className="space-y-4 w-full max-w-full overflow-hidden px-2 md:px-0">
            {alert && (
                <div className="fixed bottom-4 right-4 z-50">
                    <GlobalAlert
                        type={alert.type}
                        message={alert.message}
                        onClose={() => setAlert(null)}
                    />
                </div>
            )}
            <h1 className="title-h1">Chamados da Equipe</h1>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                <div className="flex-1 w-full sm:w-auto">
                    <Searchbar onSearch={handleSearch} />
                </div>
                <div className="flex gap-3 justify-end">
                    {/* Filtro combinado */}
                    <DropdownMenu open={filterOpen} onOpenChange={setFilterOpen}>
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
                            <div className="px-4 py-2 font-semibold text-sm text-gray-700 dark:text-white">Prioridade</div>
                            <Select value={priorityFilter} onValueChange={handlePriorityChange}>
                                <SelectTrigger className="w-full mb-2">
                                    <SelectValue placeholder="Todas" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="__all__">Todas</SelectItem>
                                        {prioritiesToShow.map(priority => (
                                            <SelectItem key={priority.idPrioridade} value={String(priority.idPrioridade)}>
                                                <span className="inline-block w-4 h-4 rounded-full mr-2" style={{ backgroundColor: priority.hexCorPrimaria }} />
                                                {priority.nomePrioridade}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <div className="px-4 py-2 font-semibold text-sm text-gray-700 dark:text-white">Status</div>
                            <Select value={statusFilter} onValueChange={handleStatusChange}>
                                <SelectTrigger className="w-full mb-2">
                                    <SelectValue placeholder="Todos" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="__all__">Todos</SelectItem>
                                        {statusToShow.map(status => (
                                            <SelectItem key={status.idStatus} value={String(status.idStatus)}>
                                                <span className="inline-block w-4 h-4 rounded-full mr-2" style={{ backgroundColor: status.hexCorPrimaria }} />
                                                {status.nomeStatus}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <div className="px-4 py-2 font-semibold text-sm text-gray-700 dark:text-white">Ano de Abertura</div>
                            <Select value={yearAberturaFilter} onValueChange={handleYearAberturaChange}>
                                <SelectTrigger className="w-full mb-2">
                                    <SelectValue placeholder="Todos" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="__all__">Todos</SelectItem>
                                        {anosAberturaDisponiveis.map((ano) => (
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
                                    disabled={
                                        priorityFilter === "__all__" &&
                                        statusFilter === "__all__" &&
                                        yearAberturaFilter === "__all__"
                                    }
                                >
                                    <XCircle className="w-4 h-4 dark:text-white" />
                                    <span className="dark:text-white">Limpar filtros</span>
                                </Button>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="w-full max-w-full overflow-hidden">
                {loading ? (
                    <TableSpinner />
                ) : (
                    <DataTableUserTickets
                        data={filteredData}
                        visibleColumns={{
                            protocolo: true,
                            assunto: true,
                            dataAbertura: true,
                            prioridade: true,
                            status: true,
                            analista: true,
                            actions: true,
                        }}
                    />
                )}
            </div>
        </div>
    );
}
