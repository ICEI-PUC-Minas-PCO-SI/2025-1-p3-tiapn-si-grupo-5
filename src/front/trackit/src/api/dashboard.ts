import { API_BASE_URL } from "@/api/config";
import type { ITicket } from "@/api/ticket";
import type { IStatus } from "./status";
import type { IPriority } from "./priority";
import type { ITicketType } from "./tickettype";
/*

-- NÃO MAIS UTILIZADO, MAS MANTIDO PARA REFERÊNCIA --

 // Busca chamados por tipo de demanda, opcionalmente filtrando por analista.

export async function getTicketsByType(idTipoChamado: number, idAnalista?: number): Promise<ITicket[]> {
    const url = new URL(`${API_BASE_URL}/dashboard/tickets-by-type`);
    url.searchParams.append("idTipoChamado", String(idTipoChamado));
    if (idAnalista) url.searchParams.append("idAnalista", String(idAnalista));
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error("Erro ao buscar chamados por tipo de demanda");
    return response.json();
}


 // Busca chamados por status, opcionalmente filtrando por analista.

export async function getTicketsByStatus(idStatus: number, idAnalista?: number): Promise<ITicket[]> {
    const url = new URL(`${API_BASE_URL}/dashboard/tickets-by-status`);
    url.searchParams.append("idStatus", String(idStatus));
    if (idAnalista) url.searchParams.append("idAnalista", String(idAnalista));
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error("Erro ao buscar chamados por status");
    return response.json();
}


// Busca chamados por prioridade, opcionalmente filtrando por analista.

export async function getTicketsByPriority(idPrioridade: number, idAnalista?: number): Promise<ITicket[]> {
    const url = new URL(`${API_BASE_URL}/dashboard/tickets-by-priority`);
    url.searchParams.append("idPrioridade", String(idPrioridade));
    if (idAnalista) url.searchParams.append("idAnalista", String(idAnalista));
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error("Erro ao buscar chamados por prioridade");
    return response.json();
}
// Busca chamados por analista.

export async function getTicketsByAnalyst(idAnalista: number): Promise<ITicket[]> {
    const response = await fetch(`${API_BASE_URL}/dashboard/tickets-by-analyst?idAnalista=${idAnalista}`);
    if (!response.ok) throw new Error("Erro ao buscar chamados por analista");
    return response.json();
} */

/**
 * Busca o resumo do dashboard (tickets, status, prioridades, tipos de chamados).
 */

export async function getDashboardSummary(): Promise<{
    tickets: ITicket[];
    statusList: IStatus[];
    priorities: IPriority[];
    ticketTypes: ITicketType[];
}> {
    const response = await fetch(`${API_BASE_URL}/dashboard/summary`, {
        credentials: 'include'
    });
    if (!response.ok) throw new Error("Erro ao buscar resumo do dashboard");
    return response.json();
}

/**
 * Busca o resumo do dashboard do analista (tickets, status, prioridades, tipos de chamados).
 */
export async function getAnalystDashboardSummary(idAnalista: number): Promise<{
    tickets: ITicket[];
    statusList: IStatus[];
    priorities: IPriority[];
    ticketTypes: ITicketType[];
}> {
    const response = await fetch(`${API_BASE_URL}/dashboard/tickets-by-analyst?idAnalista=${idAnalista}`, {
        credentials: 'include'
    });
    if (!response.ok) throw new Error("Erro ao buscar dashboard do analista");
    return response.json();
}
