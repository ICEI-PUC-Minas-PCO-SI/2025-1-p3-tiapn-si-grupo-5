import { useEffect, useState } from "react";
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

export interface TeamTicketTableRow {
    idChamado: number;
    protocolo?: string;
    assunto: string;
    dataAbertura: string;
    prioridade: {
        idPrioridade: number;
        nomePrioridade: string;
        hexCorPrimaria: string;
    };
    status: {
        idStatus: number;
        nomeStatus: string;
        hexCorPrimaria: string;
    };
    analista?: string;
}

export function AdminTeamTickets() {
    const [tickets, setTickets] = useState<TeamTicketTableRow[]>([]);
    const [filteredData, setFilteredData] = useState<TeamTicketTableRow[]>([]);
    const [search, setSearch] = useState("");
    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [allPriorities, setAllPriorities] = useState<IPriority[]>([]);
    const [priorityFilterOpen, setPriorityFilterOpen] = useState(false);
    const [selectedPriorities, setSelectedPriorities] = useState<number[]>([]);

    useEffect(() => {
        Promise.all([getTeamTickets(), getAllPriorities(), getAllStatus(), getAllUsers()])
            .then(([ticketsData, priorities, statuses, users]: [
                ITicket[],
                IPriority[],
                IStatus[],
                IUserListItem[]
            ]) => {
                setAllPriorities(priorities);

                const mapped: TeamTicketTableRow[] = ticketsData.map((t) => {
                    let formattedProtocolo = "";
                    if (t.protocolo && t.protocolo.length === 8) {
                        const num = t.protocolo.slice(2, 6);
                        const ano = t.protocolo.slice(6, 8);
                        formattedProtocolo = `#${num}/${ano}`;
                    } else {
                        formattedProtocolo = t.protocolo || "";
                    }
                    const prioridadeObj = priorities.find(p => p.idPrioridade === t.idPrioridade) || {
                        idPrioridade: t.idPrioridade,
                        nomePrioridade: "Não Definida",
                        hexCorPrimaria: "#888"
                    };
                    const statusObj = statuses.find(s => s.idStatus === t.idStatus) || {
                        idStatus: t.idStatus ?? 0,
                        nomeStatus: "Não Definido",
                        hexCorPrimaria: "#888"
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
                            hexCorPrimaria: prioridadeObj.hexCorPrimaria
                        },
                        status: {
                            idStatus: statusObj.idStatus,
                            nomeStatus: statusObj.nomeStatus,
                            hexCorPrimaria: statusObj.hexCorPrimaria
                        },
                        analista: analistaName
                    };
                });
                setTickets(mapped);
                setFilteredData(mapped);
                setAlert(null);
            })
            .catch(() => {
                setTickets([]);
                setFilteredData([]);
                setAlert({ type: "error", message: "Erro ao buscar chamados ou parâmetros." });
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
        if (selectedPriorities.length > 0) {
            data = data.filter((ticket) =>
                selectedPriorities.includes(ticket.prioridade.idPrioridade)
            );
        }
        setFilteredData(data);
    }, [search, tickets, selectedPriorities]);

    const handlePriorityToggle = (idPrioridade: number) => {
        setSelectedPriorities((prev) =>
            prev.includes(idPrioridade)
                ? prev.filter((id) => id !== idPrioridade)
                : [...prev, idPrioridade]
        );
    };

    const clearPriorityFilter = () => {
        setSelectedPriorities([]);
        setPriorityFilterOpen(false);
    };

    const prioritiesInTickets = Array.from(
        new Set(tickets.map((t) => t.prioridade.idPrioridade))
    );
    const prioritiesToShow = allPriorities.filter((p) =>
        prioritiesInTickets.includes(p.idPrioridade)
    );

    return (
        <div className="space-y-4">
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
            <div className="flex justify-between">
                <Searchbar onSearch={setSearch} />
                <div className="flex gap-3">
                    <DropdownMenu open={priorityFilterOpen} onOpenChange={setPriorityFilterOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="outline">
                                <Filter className="w-4 h-4 mr-1" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="min-w-[220px]">
                            <div className="px-4 py-2 font-semibold text-sm text-gray-700">Prioridade</div>
                            {prioritiesToShow.length === 0 ? (
                                <span className="block px-4 py-2 text-gray-500">Nenhuma prioridade encontrada</span>
                            ) : (
                                prioritiesToShow.map((priority) => (
                                    <div
                                        key={priority.idPrioridade}
                                        className="flex items-center gap-2 px-4 py-1 cursor-pointer"
                                        onClick={() => handlePriorityToggle(priority.idPrioridade)}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedPriorities.includes(priority.idPrioridade)}
                                            readOnly
                                            className="accent-primary"
                                        />
                                        <span
                                            className="inline-block w-4 h-4 rounded-full mr-2"
                                            style={{ backgroundColor: priority.hexCorPrimaria }}
                                        />
                                        {priority.nomePrioridade}
                                    </div>
                                ))
                            )
                            }
                            <div className="flex justify-center px-2 pb-2">
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={clearPriorityFilter}
                                    className="flex items-center gap-1"
                                    disabled={selectedPriorities.length === 0}
                                >
                                    <XCircle className="w-4 h-4" />
                                    Limpar filtros
                                </Button>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
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
        </div>
    );
}
