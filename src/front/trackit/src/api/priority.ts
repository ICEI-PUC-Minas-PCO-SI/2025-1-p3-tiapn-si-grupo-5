import { API_BASE_URL } from "@/api/config";
import { authHeaders } from "@/contexts/helperCookies";

export interface IPriority {
    idPrioridade: number;
    nomePrioridade: string;
    hexCorPrimaria: string;
    hexCorSecundaria: string;
    ativo: number;
}

export async function getAllPriorities(): Promise<IPriority[]> {
    const response = await fetch(`${API_BASE_URL}/priorities`);
    if (!response.ok) throw new Error("Erro ao buscar prioridades");
    return response.json();
}

export async function addPriority(nomePrioridade: string, color: string): Promise<IPriority> {
    const response = await fetch(`${API_BASE_URL}/priorities`, {
        method: "POST",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ nomePrioridade, color }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao adicionar prioridade.");
    }
    return response.json();
}

export async function updatePriority(idPrioridade: number, nomePrioridade: string, color: string): Promise<IPriority> {
    const response = await fetch(`${API_BASE_URL}/priorities/${idPrioridade}`, {
        method: "PUT",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({
            idPrioridade,
            nomePrioridade,
            color
        }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao atualizar prioridade.");
    }
    return response.json();
}

export async function deletePriority(idPrioridade: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/priorities/${idPrioridade}`, {
        method: "DELETE",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ idPrioridade }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao excluir a prioridade.");
    }
}
