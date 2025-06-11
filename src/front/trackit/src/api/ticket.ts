import { API_BASE_URL } from "@/api/config";

export interface ITicket {
    idChamado: number;
    protocolo: string;
    assunto: string;
    descricao: string;
    dataAbertura: string;
    dataAtualizacao?: string | null;
    dataFechamento?: string | null;
    idSolicitante: number
    idAnalista?: number | null;
    idTipoChamado: number;
    idStatus?: number | null;
    idPrioridade: number;
}

export interface INewTicket {
    assunto: string;
    descricao: string;
    idSolicitante: number;
    idPrioridade: number;
    idTipoChamado: number;
}

export async function sendTicket(payload: INewTicket): Promise<Response> {
    const token = localStorage.getItem("token");
    return fetch(`${API_BASE_URL}/tickets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload),
    });
}

export async function getAllTickets(): Promise<ITicket[]> {
    const response = await fetch(`${API_BASE_URL}/tickets`);
    if (!response.ok) throw new Error("Erro ao buscar chamados");
    return response.json();
}

export async function getUnassignedTickets(): Promise<ITicket[]> {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/tickets/unassigned`, {
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
    });
    if (!response.ok) throw new Error("Erro ao buscar chamados não atribuídos");
    return response.json();
}

export async function getMyTickets(): Promise<ITicket[]> {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/tickets/my`, {
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
    });
    if (!response.ok) throw new Error("Erro ao buscar meus chamados");
    return response.json();
}

export async function assignTicket(idChamado: number): Promise<void> {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/tickets/${idChamado}/assign`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
    });
    if (!response.ok) throw new Error("Erro ao assumir chamado");
}

export async function updateTicketAnalyst(
    idChamado: number,
    idAnalista: number
): Promise<void> {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/tickets/${idChamado}/analyst`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ idAnalista }),
    });
    if (!response.ok) throw new Error("Erro ao atualizar analista do chamado");
}

export async function getTeamTickets(): Promise<ITicket[]> {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/tickets/team`, {
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
    });
    if (!response.ok) throw new Error("Erro ao buscar chamados da equipe");
    return response.json();
}