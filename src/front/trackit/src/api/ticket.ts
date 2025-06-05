import { API_BASE_URL } from "./config";

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
    idTipoChamado?: number | null; // Alterar depois para Obrigatório
    idStatus?: number | null; // Alterar depois para Obrigatório
    idPrioridade?: number | null; // Alterar depois para Obrigatório
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