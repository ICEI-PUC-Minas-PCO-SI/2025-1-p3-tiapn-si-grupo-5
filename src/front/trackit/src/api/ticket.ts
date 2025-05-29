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