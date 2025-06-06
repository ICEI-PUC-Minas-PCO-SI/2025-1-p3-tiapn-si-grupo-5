import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { fetchTickets, assignTicket } from "@/api/ticket";
import { Search, Filter, SortAsc, CheckCircle, Clock, FolderOpen, AlertTriangle, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Ticket {
  idChamado: number;
  assunto: string;
  dataAbertura: string;
  prioridade: string;
  status?: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  "Aguardando": { label: "Aguardando", color: "bg-blue-100 text-blue-700", icon: <Clock className="inline w-4 h-4 mr-1" /> },
  "Em aberto": { label: "Em aberto", color: "bg-gray-200 text-gray-700", icon: <FolderOpen className="inline w-4 h-4 mr-1" /> },
  "Em análise": { label: "Em análise", color: "bg-yellow-100 text-yellow-700", icon: <AlertTriangle className="inline w-4 h-4 mr-1" /> },
  "Resolvido": { label: "Resolvido", color: "bg-green-100 text-green-700", icon: <CheckCircle className="inline w-4 h-4 mr-1" /> },
};

export function AssignTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  // Filtros e ordenação
  const [filterOpen, setFilterOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [orderBy, setOrderBy] = useState<"dataDesc" | "dataAsc" | "prioridade">("dataDesc");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchTickets() // <-- Buscar apenas chamados não atribuídos
      .then((data: Ticket[]) => {
        setTickets(data);
        setError("");
      })
      .catch(() => {
        setTickets([]);
        setError("Erro ao buscar chamados.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Funções auxiliares para normalização
  function normalizePriority(priority?: string) {
    if (!priority) return "";
    const p = priority.trim().toLowerCase();
    if (["alta"].includes(p)) return "Alta";
    if (["médio", "media", "média"].includes(p)) return "Médio";
    if (["baixo", "baixa"].includes(p)) return "Baixo";
    return priority;
  }
  function normalizeStatus(status?: string) {
    if (!status) return "Aguardando";
    const s = status.trim().toLowerCase();
    if (["aguardando"].includes(s)) return "Aguardando";
    if (["em aberto", "aberto"].includes(s)) return "Em aberto";
    if (["em análise", "em analise", "analise", "análise"].includes(s)) return "Em análise";
    if (["resolvido", "resolvida"].includes(s)) return "Resolvido";
    return status;
  }

  let filteredTickets = tickets.filter((ticket: Ticket) =>
    ticket.assunto.toLowerCase().includes(search.toLowerCase()) ||
    ticket.idChamado.toString().includes(search)
  );
  if (priorityFilter) filteredTickets = filteredTickets.filter(t => normalizePriority(t.prioridade) === normalizePriority(priorityFilter));
  if (statusFilter) filteredTickets = filteredTickets.filter(t => normalizeStatus(t.status) === normalizeStatus(statusFilter));

  // Ordenação
  filteredTickets = filteredTickets.slice().sort((a, b) => {
    if (orderBy === "dataDesc") return new Date(b.dataAbertura).getTime() - new Date(a.dataAbertura).getTime();
    if (orderBy === "dataAsc") return new Date(a.dataAbertura).getTime() - new Date(b.dataAbertura).getTime();
    if (orderBy === "prioridade") {
      const p: Record<string, number> = { "Alta": 3, "Médio": 2, "Baixo": 1 };
      return (p[b.prioridade] ?? 0) - (p[a.prioridade] ?? 0);
    }
    return 0;
  });

  const handleAssign = async (idChamado: number) => {
    setLoading(true);
    try {
      await assignTicket(idChamado);
      // Atualiza a lista imediatamente após atribuição
      setTickets(tickets => tickets.filter(t => t.idChamado !== idChamado));
      // Redireciona para "Meus chamados"
      navigate("/analyst/my-tickets");
    } catch {
      setError("Erro ao assumir chamado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">Atribuir chamados</h1>
      <div className="flex flex-wrap gap-4 items-center mb-4 relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Pesquisar"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded px-3 py-2 pl-10 min-w-[220px] focus:outline-sky-500"
          />
          <Search className="absolute left-2 top-2.5 w-5 h-5 text-gray-400" />
        </div>
        <div className="relative">
          <Button variant="outline" className="flex items-center gap-2" onClick={() => {
            setFilterOpen(v => !v);
            setOrderOpen(false); // Fecha o menu de ordenação ao abrir filtro
          }}>
            <Filter className="w-4 h-4" />Filtrar <ChevronDown className="w-4 h-4" />
          </Button>
          {filterOpen && (
            <div className="absolute z-10 bg-white border rounded shadow-md mt-2 p-4 min-w-[200px] flex flex-col gap-2">
              <div className="font-semibold mb-1">Prioridade</div>
              {["Alta", "Médio", "Baixo"].map(p => (
                <label key={p} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="priority" checked={priorityFilter === p} onChange={() => setPriorityFilter(priorityFilter === p ? null : p)} />
                  {p}
                </label>
              ))}
              <div className="font-semibold mt-2 mb-1">Status</div>
              {["Aguardando", "Em aberto", "Em análise", "Resolvido"].map(s => (
                <label key={s} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="status" checked={statusFilter === s} onChange={() => setStatusFilter(statusFilter === s ? null : s)} />
                  {s}
                </label>
              ))}
              <Button size="sm" variant="ghost" className="mt-2" onClick={() => { setPriorityFilter(null); setStatusFilter(null); setFilterOpen(false); }}>Limpar filtros</Button>
            </div>
          )}
        </div>
        <div className="relative">
          <Button variant="outline" className="flex items-center gap-2" onClick={() => {
            setOrderOpen(v => !v);
            setFilterOpen(false); // Fecha o menu de filtro ao abrir ordenação
          }}>
            <SortAsc className="w-4 h-4" />Ordenar <ChevronDown className="w-4 h-4" />
          </Button>
          {orderOpen && (
            <div className="absolute z-10 bg-white border rounded shadow-md mt-2 p-2 min-w-[180px] flex flex-col gap-2">
              <Button size="sm" variant={orderBy === "dataDesc" ? "default" : "ghost"} onClick={() => { setOrderBy("dataDesc"); setOrderOpen(false); }}>Mais recente</Button>
              <Button size="sm" variant={orderBy === "dataAsc" ? "default" : "ghost"} onClick={() => { setOrderBy("dataAsc"); setOrderOpen(false); }}>Mais antigo</Button>
              <Button size="sm" variant={orderBy === "prioridade" ? "default" : "ghost"} onClick={() => { setOrderBy("prioridade"); setOrderOpen(false); }}>Prioridade</Button>
            </div>
          )}
        </div>
      </div>
      {loading ? (
        <div className="text-center py-8">Carregando chamados...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border rounded bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-3 text-left">Número</th>
                <th className="px-4 py-3 text-left">Assunto</th>
                <th className="px-4 py-3 text-left">Data</th>
                <th className="px-4 py-3 text-left">Prioridade</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Ação</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6">Nenhum chamado encontrado</td>
                </tr>
              ) : (
                filteredTickets.map((ticket: Ticket) => {
                  const data = ticket.dataAbertura ? new Date(ticket.dataAbertura) : null;
                  const dataFormatada = data ? data.toLocaleDateString('pt-BR') : "";
                  let prioridadeBadge = null;
                  // Badge de prioridade
                  if (normalizePriority(ticket.prioridade) === "Alta") prioridadeBadge = <span className="px-5 py-1 rounded bg-red-600 text-white font-bold text-base">Alto</span>;
                  else if (normalizePriority(ticket.prioridade) === "Médio") prioridadeBadge = <span className="px-5 py-1 rounded bg-yellow-400 text-black font-bold text-base">Médio</span>;
                  else if (normalizePriority(ticket.prioridade) === "Baixo") prioridadeBadge = <span className="px-5 py-1 rounded bg-green-600 text-white font-bold text-base">Baixo</span>;
                  else prioridadeBadge = <span className="px-5 py-1 rounded bg-gray-200 text-gray-700 font-bold text-base">-</span>;
                  return (
                    <tr key={ticket.idChamado} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{ticket.idChamado}</td>
                      <td className="px-4 py-2 max-w-[220px] truncate">{ticket.assunto}</td>
                      <td className="px-4 py-2">{dataFormatada}</td>
                      <td className="px-4 py-2">{prioridadeBadge}</td>
                      <td className="px-4 py-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded text-sm font-medium ${STATUS_CONFIG[normalizeStatus(ticket.status)].color}`}>
                          {STATUS_CONFIG[normalizeStatus(ticket.status)].icon}
                          {STATUS_CONFIG[normalizeStatus(ticket.status)].label}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <Button onClick={() => handleAssign(ticket.idChamado)}>
                          Atender
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          {}
          <div className="flex justify-start mt-6">
            <Button variant="outline" className="text-xs px-3 py-1" disabled>Página &lt; 1 &gt;</Button>
          </div>
        </div>
      )}
    </div>
  );
}
