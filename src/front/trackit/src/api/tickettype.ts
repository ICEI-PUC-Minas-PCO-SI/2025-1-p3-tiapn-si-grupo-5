import { API_BASE_URL } from "@/api/config";

export interface ITicketType {
    idTipoChamado: number;
    nomeTipo: string;
    ativo: number;
}

export async function getAllTicketTypes(): Promise<ITicketType[]> {
    const response = await fetch(`${API_BASE_URL}/ticket-types`, {
        credentials: 'include'
    });
    if (!response.ok) throw new Error("Erro ao buscar tipos de chamado");
    return response.json();
}

export async function createTicketType(nomeTipo: string): Promise<ITicketType> {
    const response = await fetch(`${API_BASE_URL}/ticket-types`, {
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nomeTipo }),
    });
    if (!response.ok) throw new Error("Erro ao criar tipo de chamado");
    return response.json();
}

export async function updateTicketType(idTipoChamado: number, nomeTipo: string): Promise<ITicketType> {
    const response = await fetch(`${API_BASE_URL}/ticket-types/${idTipoChamado}`, {
        method: "PUT",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            idTipoChamado,
            nomeTipo
        }),
    });
    if (!response.ok) throw new Error("Erro ao atualizar tipo de chamado");
    return response.json();
}

export async function deleteTicketType(idTipoChamado: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/ticket-types/${idTipoChamado}`, {
        method: "DELETE",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
        let errorMsg = "Erro ao deletar tipo de chamado";
        try {
            const errorData = await response.json();
            errorMsg = errorData?.error || errorMsg;
        } catch (e) {
            console.error(e)
        }
        throw new Error(errorMsg);
    }
}