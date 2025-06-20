import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getMyTickets } from "@/api/ticket";
import type { ITicket } from "@/api/ticket";
import { Button } from "@/components/ui/button";
import { GlobalAlert } from "@/components/ui/GlobalAlert";
import { Searchbar } from "@/components/ui/SearchBar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { DataTableUserTickets } from "@/components/user-tickets/DataTableUserTickets";
import type { AssignTicketTableRow } from "@/components/assing-tickets/DataTableAssignTickets";
import { Filter } from "lucide-react";
import { getAllPriorities } from "@/api/priority";
import type { IPriority } from "@/api/priority";
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
import { getAllStatus } from "@/api/status";
import type { IStatus } from "@/api/status";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function AnalystTickets() {
  type TicketWithStatus = AssignTicketTableRow & {
    status: {
      idStatus: number;
      nomeStatus: string;
      hexCorPrimaria: string;
      hexCorSecundaria: string;
    };
    prioridade: {
      idPrioridade: number;
      nomePrioridade: string;
      hexCorPrimaria: string;
      hexCorSecundaria: string;
    };
  };

  const [tickets, setTickets] = useState<TicketWithStatus[]>([]);
  const [filteredData, setFilteredData] = useState<TicketWithStatus[]>([]);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [allPriorities, setAllPriorities] = useState<IPriority[]>([]);
  const [allStatus, setAllStatus] = useState<IStatus[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const priorityFilter = searchParams.get("priority") || "__all__";
  const statusFilter = searchParams.get("status") || "__all__";
  const openingYearFilter = searchParams.get("openingYear") || "__all__";

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
    Promise.all([getMyTickets(), getAllPriorities(), getAllStatus()])
      .then(([ticketsData, priorities, statuses]: [ITicket[], IPriority[], IStatus[]]) => {
        const priorityMap = new Map<number, IPriority>();
        priorities.forEach((p) => priorityMap.set(p.idPrioridade, p));
        setAllPriorities(priorities);
        setAllStatus(statuses);

        const mapped: TicketWithStatus[] = ticketsData.map((t) => {
          let formattedProtocolo = "";
          if (t.protocolo && t.protocolo.length === 8) {
            const num = t.protocolo.slice(0, 6);
            const ano = t.protocolo.slice(6, 8);
            formattedProtocolo = `#${num}/${ano}`;
          } else {
            formattedProtocolo = t.protocolo || "";
          }
          const prioridadeObj = priorityMap.get(t.idPrioridade) || {
            idPrioridade: t.idPrioridade,
            nomePrioridade: "Não Definida",
            hexCorPrimaria: "#888",
            hexCorSecundaria: "#fff"
          };
          const statusObj = statuses.find(s => s.idStatus === t.idStatus) || {
            idStatus: t.idStatus ?? 0,
            nomeStatus: t.idStatus ? "Não Definido" : "-",
            hexCorPrimaria: "#888",
            hexCorSecundaria: "#fff"
          };
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
            }
          };
        });
        setTickets(mapped);
        setFilteredData(mapped);
        setAlert(null);
        setLoading(false);
      })
      .catch(() => {
        setTickets([]);
        setFilteredData([]);
        setAlert({ type: "error", message: "Erro ao buscar chamados ou prioridades." });
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
    if (openingYearFilter && openingYearFilter !== "__all__") {
      data = data.filter((ticket) => {
        if (!ticket.dataAbertura) return false;
        const year = new Date(ticket.dataAbertura).getFullYear();
        return String(year) === openingYearFilter;
      });
    }
    setFilteredData(data);
  }, [search, tickets, priorityFilter, statusFilter, openingYearFilter]);

  const prioritiesInTickets = Array.from(
    new Set(tickets.map((t) => t.prioridade.idPrioridade))
  );
  const prioritiesToShow = allPriorities.filter((p) =>
    prioritiesInTickets.includes(p.idPrioridade)
  );

  const statusInTickets = Array.from(
    new Set(tickets.map((t) => t.status?.idStatus))
  );
  const statusToShow = allStatus.filter((s) =>
    statusInTickets.includes(s.idStatus)
  );

  const clearFilters = () => {
    setSearchParams(params => {
      params.delete("priority");
      params.delete("status");
      params.delete("openingYear");
      return params;
    });
  };

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

  const handleopeningYearChange = (value: string) => {
    setSearchParams(params => {
      if (value === "__all__") {
        params.delete("openingYear");
      } else {
        params.set("openingYear", value);
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
      <h1 className="title-h1">Meus chamados</h1>
      <div className="flex justify-between">
        <Searchbar onSearch={handleSearch} />
        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="outline">
                      <Filter className="w-4 h-4 mr-1" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Filtrar
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[260px]">
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
              <Select value={openingYearFilter} onValueChange={handleopeningYearChange}>
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
                  className="flex items-center gap-1"
                  disabled={
                    priorityFilter === "__all__" &&
                    statusFilter === "__all__" &&
                    openingYearFilter === "__all__"
                  }
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
          <DataTableUserTickets
            data={filteredData}
            visibleColumns={{
              protocolo: true,
              assunto: true,
              dataAbertura: true,
              prioridade: true,
              status: true,
              analista: false,
              actions: true,
            }}
          />
        )}
      </div>
    </div>
  );
}
