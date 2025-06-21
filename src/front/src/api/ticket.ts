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
    urlAnexo?: string | null;
    nomeArquivo?: string | null;
}

export interface INewTicket {
    assunto: string;
    descricao: string;
    idSolicitante: number;
    idPrioridade: number;
    idTipoChamado: number;
    urlAnexo?: string;
    nomeArquivo?: string;
}

export async function sendTicket(payload: INewTicket): Promise<Response> {
    return fetch(`${API_BASE_URL}/tickets`, {
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
}

export async function getAllTickets(): Promise<ITicket[]> {
    const response = await fetch(`${API_BASE_URL}/tickets`, {
        credentials: 'include'
    });
    if (!response.ok) throw new Error("Erro ao buscar chamados");
    return response.json();
}

export async function getUnassignedTickets(): Promise<ITicket[]> {
    const response = await fetch(`${API_BASE_URL}/tickets/unassigned`, {
        credentials: 'include'
    });
    if (!response.ok) throw new Error("Erro ao buscar chamados não atribuídos");
    return response.json();
}

export async function getMyTickets(): Promise<ITicket[]> {
    const response = await fetch(`${API_BASE_URL}/tickets/my`, {
        credentials: 'include'
    });
    if (!response.ok) throw new Error("Erro ao buscar meus chamados");
    return response.json();
}

export async function assignTicket(idChamado: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tickets/${idChamado}/assign`, {
        method: "PATCH",
        credentials: 'include'
    });
    if (!response.ok) throw new Error("Erro ao assumir chamado");
}

export async function updateTicketAnalyst(
    idChamado: number,
    idAnalista: number
): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tickets/${idChamado}/analyst`, {
        method: "PATCH",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idAnalista }),
    });
    if (!response.ok) throw new Error("Erro ao atualizar analista do chamado");
}

export async function getTeamTickets(): Promise<ITicket[]> {
    const response = await fetch(`${API_BASE_URL}/tickets/team`, {
        credentials: 'include'
    });
    if (!response.ok) throw new Error("Erro ao buscar chamados da equipe");
    return response.json();
}

export async function getTicketsByAnalystId(idAnalista: number): Promise<ITicket[]> {
    const response = await fetch(`${API_BASE_URL}/tickets/analyst/${idAnalista}`, {
        credentials: 'include'
    });
    if (!response.ok) throw new Error("Erro ao buscar chamados do analista");
    return response.json();
}

export async function getTicketsBySolicitanteId(idSolicitante: number): Promise<ITicket[]> {
    const response = await fetch(`${API_BASE_URL}/tickets/user/${idSolicitante}`, {
        credentials: 'include'
    });
    if (!response.ok) throw new Error("Erro ao buscar chamados do usuário");
    return response.json();
}

export async function getTicketById(idChamado: number) {
    const response = await fetch(`${API_BASE_URL}/tickets/${idChamado}`, {
        credentials: 'include'
    });
    if (!response.ok) throw new Error("Erro ao buscar chamado por id");
    return response.json();
}

export async function getTicketByIdFull(idChamado: number): Promise<ITicket> {
    const response = await fetch(`${API_BASE_URL}/tickets/${idChamado}`, {
        credentials: 'include'
    });
    if (!response.ok) throw new Error("Erro ao buscar chamado por id");
    return response.json();
}

export async function updateTicketStatus(idChamado: number, idStatus: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tickets/${idChamado}/status`, {
        method: "PATCH",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idStatus }),
    });
    if (!response.ok) throw new Error("Erro ao atualizar status do chamado");
}

export async function closeTicket(idChamado: number, dataFechamento: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tickets/${idChamado}/close`, {
        method: "PATCH",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataFechamento }),
    });
    if (!response.ok) throw new Error("Erro ao encerrar chamado");
}

export async function reopenTicket(idChamado: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tickets/${idChamado}/reopen`, {
        method: "PATCH",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Erro ao reabrir chamado");
}

export interface ITicketFull extends ITicket {
    usuario_chamado_idSolicitanteTousuario?: {
        idUsuario: number;
        nomeUsuario: string;
        gerencia?: {
            nomeGerencia: string;
        } | null;
    } | null;
    usuario_chamado_idAnalistaTousuario?: {
        idUsuario: number;
        nomeUsuario: string;
        gerencia?: {
            nomeGerencia: string;
        } | null;
    } | null;
    prioridadechamado?: {
        idPrioridade: number;
        nomePrioridade: string;
        ativo: number;
        hexCorPrimaria: string;
        hexCorSecundaria: string;
    } | null;
    statuschamado?: {
        idStatus: number;
        nomeStatus: string;
        ativo: number;
        hexCorPrimaria: string;
        hexCorSecundaria: string;
    } | null;
    tipochamado?: {
        idTipoChamado: number;
        nomeTipo: string;
        ativo: number;
    } | null;
}