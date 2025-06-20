import { API_BASE_URL } from "@/api/config";

export interface IPriority {
    idPrioridade: number;
    nomePrioridade: string;
    hexCorPrimaria: string;
    hexCorSecundaria: string;
    ativo: number;
}

export async function getAllPriorities(): Promise<IPriority[]> {
    const response = await fetch(`${API_BASE_URL}/priorities`, {
        credentials: 'include'
    });
    if (!response.ok) throw new Error("Erro ao buscar prioridades");
    return response.json();
}

export async function addPriority(nomePrioridade: string, hexCorPrimaria: string, hexCorSecundaria: string): Promise<IPriority> {
    const response = await fetch(`${API_BASE_URL}/priorities`, {
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nomePrioridade, hexCorPrimaria, hexCorSecundaria }),
    });
    if (!response.ok) throw new Error("Erro ao adicionar prioridade");
    return response.json();
}

export async function updatePriority(idPrioridade: number, nomePrioridade: string, hexCorPrimaria: string, hexCorSecundaria: string): Promise<IPriority> {
    const response = await fetch(`${API_BASE_URL}/priorities/${idPrioridade}`, {
        method: "PUT",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idPrioridade, nomePrioridade, hexCorPrimaria, hexCorSecundaria }),
    });
    if (!response.ok) throw new Error("Erro ao atualizar prioridade");
    return response.json();
}

export async function deletePriority(idPrioridade: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/priorities/${idPrioridade}`, {
        method: "DELETE",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idPrioridade }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao excluir a prioridade.");
    }
}

