import { API_BASE_URL } from "@/api/config";
import type { ITicket } from "@/api/ticket";

/**
 * Busca chamados por tipo de demanda.
 * @param idTipoChamado id do tipo de chamado
 */
export async function getTicketsByType(idTipoChamado: number): Promise<ITicket[]> {
    const response = await fetch(`${API_BASE_URL}/dashboard/tickets-by-type?idTipoChamado=${idTipoChamado}`);
    if (!response.ok) throw new Error("Erro ao buscar chamados por tipo de demanda");
    return response.json();
}

/**
 * Busca chamados por status.
 * @param idStatus id do status
 */
export async function getTicketsByStatus(idStatus: number): Promise<ITicket[]> {
    const response = await fetch(`${API_BASE_URL}/dashboard/tickets-by-status?idStatus=${idStatus}`);
    if (!response.ok) throw new Error("Erro ao buscar chamados por status");
    return response.json();
}

/**
 * Busca chamados por prioridade.
 * @param idPrioridade id da prioridade
 */
export async function getTicketsByPriority(idPrioridade: number): Promise<ITicket[]> {
    const response = await fetch(`${API_BASE_URL}/dashboard/tickets-by-priority?idPrioridade=${idPrioridade}`);
    if (!response.ok) throw new Error("Erro ao buscar chamados por prioridade");
    return response.json();
}

/**
 * Busca chamados por analista.
 * @param idAnalista id do analista
 */
export async function getTicketsByAnalyst(idAnalista: number): Promise<ITicket[]> {
    const response = await fetch(`${API_BASE_URL}/dashboard/tickets-by-analyst?idAnalista=${idAnalista}`);
    if (!response.ok) throw new Error("Erro ao buscar chamados por analista");
    return response.json();
}
