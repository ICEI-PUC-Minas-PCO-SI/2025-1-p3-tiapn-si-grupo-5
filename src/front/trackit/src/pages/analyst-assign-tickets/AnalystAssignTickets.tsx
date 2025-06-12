import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getUnassignedTickets, assignTicket } from "@/api/ticket";
import type { ITicket } from "@/api/ticket";
import { getAllPriorities } from "@/api/priority";
import type { IPriority } from "@/api/priority";
import { Button } from "@/components/ui/button";
import { GlobalAlert } from "@/components/ui/GlobalAlert";
import { Searchbar } from "@/components/ui/SearchBar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { DataTableAssignTickets } from "@/components/assing-tickets/DataTableAssignTickets";
import type { AssignTicketTableRow } from "@/components/assing-tickets/DataTableAssignTickets";
import { Filter } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export function AnalystAssignTickets() {
  const [tickets, setTickets] = useState<AssignTicketTableRow[]>([]);
  const [filteredData, setFilteredData] = useState<AssignTicketTableRow[]>([]);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [allPriorities, setAllPriorities] = useState<IPriority[]>([]);
  const [priorityFilterOpen, setPriorityFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [assignModal, setAssignModal] = useState<{
    open: boolean;
    ticket: AssignTicketTableRow | null;
  }>({ open: false, ticket: null });
  const [assigning, setAssigning] = useState<{ [idChamado: number]: boolean }>({});

  // Query params
  const [searchParams, setSearchParams] = useSearchParams();

  // Filtros controlados por query params
  const search = searchParams.get("search") || "";
  const priorityFilter = searchParams.get("priority") || "__all__";

  useEffect(() => {
    setLoading(true);
    Promise.all([getUnassignedTickets(), getAllPriorities()])
      .then(([ticketsData, priorities]: [ITicket[], IPriority[]]) => {
        const priorityMap = new Map<number, IPriority>();
        priorities.forEach((p) => priorityMap.set(p.idPrioridade, p));
        setAllPriorities(priorities);

        const mapped: AssignTicketTableRow[] = ticketsData.map((t) => {
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
    setFilteredData(data);
  }, [search, tickets, priorityFilter]);

  const handleAssign = async (idChamado: number) => {
    const ticket = tickets.find(t => t.idChamado === idChamado);
    if (ticket) {
      setAssignModal({ open: true, ticket });
    }
  };

  const handleConfirmAssign = async () => {
    const ticket = assignModal.ticket;
    if (!ticket) return;
    setAssigning((prev) => ({ ...prev, [ticket.idChamado]: true }));
    try {
      await assignTicket(ticket.idChamado);
      setTickets(tickets => tickets.filter(t => t.idChamado !== ticket.idChamado));
      setAlert({ type: "success", message: "Chamado atribuído com sucesso!" });
      setAssignModal({ open: false, ticket: null });
    } catch {
      setAlert({ type: "error", message: "Erro ao assumir chamado." });
    } finally {
      setAssigning((prev) => ({ ...prev, [ticket.idChamado]: false }));
    }
  };

  const closeAssignModal = () => setAssignModal({ open: false, ticket: null });

  // Prioridades presentes nos chamados
  const prioritiesInTickets = Array.from(
    new Set(tickets.map((t) => t.prioridade.idPrioridade))
  );
  const prioritiesToShow = allPriorities.filter((p) =>
    prioritiesInTickets.includes(p.idPrioridade)
  );

  // Limpar filtro de prioridade e fechar modal
  const clearPriorityFilter = () => {
    setSearchParams(params => {
      params.delete("priority");
      return params;
    });
    setPriorityFilterOpen(false);
  };

  // Handlers para filtros
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
      <h1 className="title-h1">Atribuir chamados</h1>
      <div className="flex justify-between">
        <Searchbar onSearch={handleSearch} />
        <div className="flex gap-3">
          <DropdownMenu open={priorityFilterOpen} onOpenChange={setPriorityFilterOpen}>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline">
                <Filter className="w-4 h-4 mr-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[220px]">
              <div className="px-4 py-2 font-semibold text-sm text-gray-700">Prioridade</div>
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
      <div>
        {loading ? (
          <TableSpinner />
        ) : (
          <DataTableAssignTickets
            data={filteredData}
            visibleColumns={{
              protocolo: true,
              assunto: true,
              dataAbertura: true,
              prioridade: true,
              actions: true,
            }}
            onAssign={handleAssign}
            actionsType="analyst"
          />
        )}
      </div>

      {/* Modal de confirmação para analista (apenas um modal) */}
      <Dialog open={assignModal.open} onOpenChange={closeAssignModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assumir chamado</DialogTitle>
          </DialogHeader>
          {assignModal.ticket && (
            <form
              onSubmit={e => {
                e.preventDefault();
                handleConfirmAssign();
              }}
              className="flex flex-col gap-4"
            >
              <div>
                Tem certeza que deseja assumir o chamado <b>{assignModal.ticket.protocolo}</b>?
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={assigning[assignModal.ticket.idChamado]}
                >
                  {assigning[assignModal.ticket.idChamado] ? "Assumindo..." : "Confirmar"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeAssignModal}
                >
                  Cancelar
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
