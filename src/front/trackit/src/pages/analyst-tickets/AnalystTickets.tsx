import { useEffect, useState } from "react";
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
import { DataTableMyTickets } from "@/components/analyst-tickets/DataTableMyTickets";
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

export function AnalystTickets() {
  const [tickets, setTickets] = useState<AssignTicketTableRow[]>([]);
  const [filteredData, setFilteredData] = useState<AssignTicketTableRow[]>([]);
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [allPriorities, setAllPriorities] = useState<IPriority[]>([]);
  const [priorityFilterOpen, setPriorityFilterOpen] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState<string>("__all__");

  useEffect(() => {
    Promise.all([getMyTickets(), getAllPriorities()])
      .then(([ticketsData, priorities]: [ITicket[], IPriority[]]) => {
        const priorityMap = new Map<number, IPriority>();
        priorities.forEach((p) => priorityMap.set(p.idPrioridade, p));
        setAllPriorities(priorities);

        const mapped: AssignTicketTableRow[] = ticketsData.map((t) => {
          let formattedProtocolo = "";
          if (t.protocolo && t.protocolo.length === 8) {
            const num = t.protocolo.slice(2, 6);
            const ano = t.protocolo.slice(6, 8);
            formattedProtocolo = `#${num}/${ano}`;
          } else {
            formattedProtocolo = t.protocolo || "";
          }
          const prioridadeObj = priorityMap.get(t.idPrioridade) || {
            idPrioridade: t.idPrioridade,
            nomePrioridade: "Não Definida",
            hexCorPrimaria: "#888"
          };
          return {
            idChamado: t.idChamado,
            protocolo: formattedProtocolo,
            assunto: t.assunto,
            dataAbertura: t.dataAbertura,
            prioridade: {
              idPrioridade: prioridadeObj.idPrioridade,
              nomePrioridade: prioridadeObj.nomePrioridade,
              hexCorPrimaria: prioridadeObj.hexCorPrimaria
            }
          };
        });
        setTickets(mapped);
        setFilteredData(mapped);
        setAlert(null);
      })
      .catch(() => {
        setTickets([]);
        setFilteredData([]);
        setAlert({ type: "error", message: "Erro ao buscar chamados ou prioridades." });
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
    setFilteredData(data);
  }, [search, tickets, priorityFilter]);

  // Prioridades presentes nos chamados
  const prioritiesInTickets = Array.from(
    new Set(tickets.map((t) => t.prioridade.idPrioridade))
  );
  const prioritiesToShow = allPriorities.filter((p) =>
    prioritiesInTickets.includes(p.idPrioridade)
  );

  // Limpar filtro de prioridade e fechar modal
  const clearPriorityFilter = () => {
    setPriorityFilter("__all__");
    setPriorityFilterOpen(false);
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
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
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
              <div className="flex justify-center px-2 pb-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={clearPriorityFilter}
                  className="flex items-center gap-1"
                  disabled={priorityFilter === "__all__"}
                >
                  <XCircle className="w-4 h-4" />
                  Limpar filtros
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <DataTableMyTickets
        data={filteredData}
        visibleColumns={{
          protocolo: true,
          assunto: true,
          dataAbertura: true,
          prioridade: true,
          actions: true,
        }}
      />
    </div>
  );
}
