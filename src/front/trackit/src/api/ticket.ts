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
    idPrioridade?: number | null;
    idTipoChamado?: number | null;
}

export async function sendTicket(payload: INewTicket): Promise<Response> {
    const token = localStorage.getItem("token");
    return fetch("/tickets", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload),
    });
}