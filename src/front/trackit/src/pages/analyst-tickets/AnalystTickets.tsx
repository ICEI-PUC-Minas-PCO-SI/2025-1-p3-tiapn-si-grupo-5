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
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { DataTableMyTickets } from "@/components/analyst-tickets/DataTableMyTickets";
import type { AssignTicketTableRow } from "@/components/assing-tickets/DataTableAssignTickets";
import { Filter } from "lucide-react";
import { getAllPriorities } from "@/api/priority";
import type { IPriority } from "@/api/priority";

export function AnalystTickets() {
  const [tickets, setTickets] = useState<AssignTicketTableRow[]>([]);
  const [filteredData, setFilteredData] = useState<AssignTicketTableRow[]>([]);
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    protocolo: true,
    assunto: true,
    dataAbertura: true,
    prioridade: true,
    actions: true,
  });
  const [allPriorities, setAllPriorities] = useState<IPriority[]>([]);
  const [priorityFilterOpen, setPriorityFilterOpen] = useState(false);
  const [selectedPriorities, setSelectedPriorities] = useState<number[]>([]);

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
    if (selectedPriorities.length > 0) {
      data = data.filter((ticket) =>
        selectedPriorities.includes(ticket.prioridade.idPrioridade)
      );
    }
    setFilteredData(data);
  }, [search, tickets, selectedPriorities]);

  const columnsList = [
    { id: "protocolo", label: "Número" },
    { id: "assunto", label: "Assunto" },
    { id: "dataAbertura", label: "Aberto em" },
    { id: "prioridade", label: "Prioridade" },
  ];

  const toggleColumnVisibility = (columnId: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

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
      <h1 className="title-h1">Meus chamados</h1>
      <div className="flex justify-between">
        <Searchbar onSearch={setSearch} />
        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">
                Colunas
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {columnsList.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={visibleColumns[column.id]}
                  onCheckedChange={() =>
                    toggleColumnVisibility(column.id)
                  }
                >
                  {column.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu open={priorityFilterOpen} onOpenChange={setPriorityFilterOpen}>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">
                <Filter className="w-4 h-4 mr-1" />
                Filtrar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[220px]">
              <div className="px-4 py-2 font-semibold text-sm text-gray-700">Prioridade</div>
              {prioritiesToShow.length === 0 ? (
                <span className="block px-4 py-2 text-gray-500">Nenhuma prioridade encontrada</span>
              ) : (
                prioritiesToShow.map((priority) => (
                  <DropdownMenuCheckboxItem
                    key={priority.idPrioridade}
                    checked={selectedPriorities.includes(priority.idPrioridade)}
                    onCheckedChange={() => handlePriorityToggle(priority.idPrioridade)}
                    className="flex items-center gap-2"
                  >
                    <span
                      className="inline-block w-4 h-4 rounded-full mr-2"
                      style={{ backgroundColor: priority.hexCorPrimaria }}
                    />
                    {priority.nomePrioridade}
                  </DropdownMenuCheckboxItem>
                ))
              )}
              <div className="flex justify-end p-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={clearPriorityFilter}
                  disabled={selectedPriorities.length === 0}
                >
                  Limpar filtro
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <DataTableMyTickets
        data={filteredData}
        visibleColumns={visibleColumns}
      />
    </div>
  );
}
