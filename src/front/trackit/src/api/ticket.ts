import type { NovoChamado } from "../interfaces/interfaceSendTicket";

export async function sendTicket(payload: NovoChamado): Promise<Response> {
    const token = localStorage.getItem("token");
    return fetch("http://localhost:3000/tickets", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload),
    });
}

export async function fetchTickets(params?: { meus?: boolean }) {
    const token = localStorage.getItem("token");
    let url = "http://localhost:3000/tickets";
    if (params?.meus) {
        url += "?meus=true";
    }
    const response = await fetch(url, {
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
    });
    if (!response.ok) throw new Error("Erro ao buscar chamados");
    return response.json();
}

export async function assignTicket(idChamado: number) {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/tickets/${idChamado}/assign`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
    });
    if (!response.ok) throw new Error("Erro ao assumir chamado");
    return response.json();
}