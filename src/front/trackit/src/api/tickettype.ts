import type { TicketType } from "../interfaces/InterfaceTicketType";


export async function getAllTicketTypes(): Promise<TicketType[]> {
    const response = await fetch("http://localhost:3000/tipo-chamado");
    if (!response.ok) throw new Error("Erro ao buscar tipos de chamado");
    return response.json();
}

export async function createTicketType(nomeTipo: string): Promise<TicketType> {
    const response = await fetch("http://localhost:3000/tipo-chamado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nomeTipo }),
    });
    if (!response.ok) throw new Error("Erro ao criar tipo de chamado");
    return response.json();
}

export async function updateTicketType(idTipoChamado: number, nomeTipo: string): Promise<TicketType> {
    const response = await fetch("http://localhost:3000/tipo-chamado", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idTipoChamado, nomeTipo }),
    });
    if (!response.ok) throw new Error("Erro ao atualizar tipo de chamado");
    return response.json();
}

export async function deleteTicketType(idTipoChamado: number): Promise<void> {
    const response = await fetch("http://localhost:3000/tipo-chamado", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idTipoChamado }),
    });
    if (!response.ok) throw new Error("Erro ao deletar tipo de chamado");
}