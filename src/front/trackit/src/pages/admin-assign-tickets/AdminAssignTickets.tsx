import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getUnassignedTickets, updateTicketAnalyst } from "@/api/ticket";
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
import { AdminAssignTicketsTable } from "@/components/assing-tickets/AdminAssignTicketsTable";
import type { AssignTicketTableRow } from "@/components/assing-tickets/DataTableAssignTickets";
import { Filter } from "lucide-react";
import { getAllUsers } from "@/api/users";
import type { IUserListItem } from "@/api/users";
import { useUser } from "@/contexts/UserContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { XCircle } from "lucide-react";
import { TableSpinner } from "@/components/ui/spinner";

export function AdminAssignTickets() {
  const [tickets, setTickets] = useState<AssignTicketTableRow[]>([]);
  const [filteredData, setFilteredData] = useState<AssignTicketTableRow[]>([]);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [allPriorities, setAllPriorities] = useState<IPriority[]>([]);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [analysts, setAnalysts] = useState<IUserListItem[]>([]);
  const { user } = useUser();
  const [assigning, setAssigning] = useState<{ [idChamado: number]: boolean }>({});
  const [selectedAnalyst, setSelectedAnalyst] = useState<{ [idChamado: number]: string }>({});
  const [assignModal, setAssignModal] = useState<{
    open: boolean;
    ticket: AssignTicketTableRow | null;
  }>({ open: false, ticket: null });
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    ticket: AssignTicketTableRow | null;
    analystId: string;
  }>({ open: false, ticket: null, analystId: "" });
  const [loading, setLoading] = useState(true);

  // Query params
  const [searchParams, setSearchParams] = useSearchParams();

  // Filtros controlados por query params
  const search = searchParams.get("search") || "";
  const priorityFilter = searchParams.get("priority") || "__all__";

  useEffect(() => {
    setLoading(true);
    Promise.all([getUnassignedTickets(), getAllPriorities(), getAllUsers()])
      .then(([ticketsData, priorities, users]: [ITicket[], IPriority[], IUserListItem[]]) => {
        const priorityMap = new Map<number, IPriority>();
        priorities.forEach((p) => priorityMap.set(p.idPrioridade, p));
        setAllPriorities(priorities);

        const analystsFiltered = users.filter(
          (u) => u.accessType === "Analista" && u.management.idGerencia === user?.gerencia
        );
        setAnalysts(analystsFiltered);

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
        setLoading(false);
      })
      .catch(() => {
        setTickets([]);
        setFilteredData([]);
        setAlert({ type: "error", message: "Erro ao buscar chamados ou prioridades." });
        setLoading(false);
      });
  }, [user]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  // Filtro por prioridade e busca
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

  const openAssignModal = (ticket: AssignTicketTableRow) => {
    setAssignModal({ open: true, ticket });
  };

  const openConfirmModal = (ticket: AssignTicketTableRow, analystId: string) => {
    setConfirmModal({ open: true, ticket, analystId });
  };

  const closeAssignModal = () => setAssignModal({ open: false, ticket: null });
  const closeConfirmModal = () => setConfirmModal({ open: false, ticket: null, analystId: "" });

  const handleAssignToAnalyst = async () => {
    const ticket = confirmModal.ticket;
    const analystId = confirmModal.analystId;
    if (!ticket || !analystId) return;
    setAssigning((prev) => ({ ...prev, [ticket.idChamado]: true }));
    try {
      await updateTicketAnalyst(ticket.idChamado, Number(analystId));
      setTickets((tickets) => tickets.filter((t) => t.idChamado !== ticket.idChamado));
      setAlert({ type: "success", message: "Chamado atribuído com sucesso!" });
      closeConfirmModal();
      closeAssignModal();
    } catch {
      setAlert({ type: "error", message: "Erro ao atribuir chamado." });
    } finally {
      setAssigning((prev) => ({ ...prev, [ticket.idChamado]: false }));
    }
  };

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
    setFilterMenuOpen(false);
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
          <DropdownMenu open={filterMenuOpen} onOpenChange={setFilterMenuOpen}>
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
          <AdminAssignTicketsTable
            data={filteredData}
            onOpenAssignModal={openAssignModal}
          />
        )}
      </div>

      {/* Modal de atribuição */}
      <Dialog open={assignModal.open} onOpenChange={closeAssignModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Atribuir chamado</DialogTitle>
          </DialogHeader>
          {assignModal.ticket && (
            <form
              onSubmit={e => {
                e.preventDefault();
                if (selectedAnalyst[assignModal.ticket!.idChamado]) {
                  openConfirmModal(assignModal.ticket!, selectedAnalyst[assignModal.ticket!.idChamado]);
                }
              }}
              className="flex flex-col gap-4"
            >
              <div>
                <label className="block mb-1 font-medium">Analista</label>
                <Select
                  value={selectedAnalyst[assignModal.ticket.idChamado] || ""}
                  onValueChange={val =>
                    setSelectedAnalyst(prev => ({
                      ...prev,
                      [assignModal.ticket!.idChamado]: val,
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o analista" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {analysts.length === 0 && (
                        <SelectItem value="" disabled>
                          Nenhum analista disponível
                        </SelectItem>
                      )}
                      {analysts.map((analyst) => (
                        <SelectItem key={analyst.id} value={analyst.id}>
                          {analyst.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={!selectedAnalyst[assignModal.ticket.idChamado]}
                >
                  Atribuir
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

      {/* Modal de confirmação */}
      <Dialog open={confirmModal.open} onOpenChange={closeConfirmModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar atribuição</DialogTitle>
          </DialogHeader>
          <div>
            Tem certeza que deseja atribuir o chamado{" "}
            <b>{confirmModal.ticket?.protocolo}</b> ao analista{" "}
            <b>
              {analysts.find(a => a.id === confirmModal.analystId)?.name || ""}
            </b>
            ?
          </div>
          <DialogFooter>
            <Button
              onClick={handleAssignToAnalyst}
              disabled={assigning[confirmModal.ticket?.idChamado || 0]}
            >
              {assigning[confirmModal.ticket?.idChamado || 0] ? "Atribuindo..." : "Confirmar"}
            </Button>
            <Button variant="outline" onClick={closeConfirmModal}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
