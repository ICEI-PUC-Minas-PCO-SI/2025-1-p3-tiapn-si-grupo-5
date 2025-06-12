import { API_BASE_URL } from "@/api/config";
import { authHeaders } from "@/contexts/helperCookies";

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
    return fetch(`${API_BASE_URL}/tickets`, {
        method: "POST",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify(payload),
    });
}

export async function getAllTickets(): Promise<ITicket[]> {
    const response = await fetch(`${API_BASE_URL}/tickets`, {
        headers: authHeaders()
    });
    if (!response.ok) throw new Error("Erro ao buscar chamados");
    return response.json();
}

export async function getUnassignedTickets(): Promise<ITicket[]> {
    const response = await fetch(`${API_BASE_URL}/tickets/unassigned`, {
        headers: authHeaders()
    });
    if (!response.ok) throw new Error("Erro ao buscar chamados não atribuídos");
    return response.json();
}

export async function getMyTickets(): Promise<ITicket[]> {
    const response = await fetch(`${API_BASE_URL}/tickets/my`, {
        headers: authHeaders()
    });
    if (!response.ok) throw new Error("Erro ao buscar meus chamados");
    return response.json();
}

export async function assignTicket(idChamado: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tickets/${idChamado}/assign`, {
        method: "PATCH",
        headers: authHeaders()
    });
    if (!response.ok) throw new Error("Erro ao assumir chamado");
}

export async function updateTicketAnalyst(
    idChamado: number,
    idAnalista: number
): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tickets/${idChamado}/analyst`, {
        method: "PATCH",
        headers: authHeaders({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify({ idAnalista }),
    });
    if (!response.ok) throw new Error("Erro ao atualizar analista do chamado");
}

export async function getTeamTickets(): Promise<ITicket[]> {
    const response = await fetch(`${API_BASE_URL}/tickets/team`, {
        headers: authHeaders()
    });
    if (!response.ok) throw new Error("Erro ao buscar chamados da equipe");
    return response.json();
}

export async function getTicketsByAnalystId(idAnalista: number): Promise<ITicket[]> {
    const response = await fetch(`${API_BASE_URL}/tickets/analyst/${idAnalista}`, {
        headers: authHeaders()
    });
    if (!response.ok) throw new Error("Erro ao buscar chamados do analista");
    return response.json();
}

export async function getTicketsBySolicitanteId(idSolicitante: number): Promise<ITicket[]> {
    const response = await fetch(`${API_BASE_URL}/tickets/user/${idSolicitante}`, {
        headers: authHeaders()
    });
    if (!response.ok) throw new Error("Erro ao buscar chamados do usuário");
    return response.json();
}

export async function getTicketById(idChamado: number) {
    const response = await fetch(`${API_BASE_URL}/tickets/${idChamado}`, {
        headers: authHeaders()
    });
    if (!response.ok) throw new Error("Erro ao buscar chamado por id");
    return response.json();
}

export interface ITicketFull extends ITicket {
    usuario_chamado_idSolicitanteTousuario?: {
        idUsuario: number;
        nomeUsuario: string;
        email: string;
    } | null;
    usuario_chamado_idAnalistaTousuario?: {
        idUsuario: number;
        nomeUsuario: string;
        email: string;
    } | null;
    prioridadechamado?: {
        idPrioridade: number;
        nomePrioridade: string;
        hexCorPrimaria: string;
    } | null;
    statuschamado?: {
        idStatus: number;
        nomeStatus: string;
        hexCorPrimaria: string;
    } | null;
    tipochamado?: {
        idTipoChamado: number;
        nomeTipo: string;
    } | null;
}