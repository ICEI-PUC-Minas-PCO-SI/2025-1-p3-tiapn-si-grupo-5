import { API_BASE_URL } from "@/api/config";

export interface IStatus {
    idStatus: number;
    nomeStatus: string;
    hexCorPrimaria: string;
    hexCorSecundaria: string;
    ativo: number;
}

export async function getAllStatus(): Promise<IStatus[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/statuses`, {
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error("Erro ao buscar status");
        }
        const statuses = await response.json();
        return statuses;
    } catch (error) {
        console.error("Erro ao buscar status", error);
        throw error;
    }
}

export async function addStatus(nomeStatus: string, hexCorPrimaria: string, hexCorSecundaria: string): Promise<IStatus> {
    const response = await fetch(`${API_BASE_URL}/statuses`, {
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nomeStatus, hexCorPrimaria, hexCorSecundaria }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao adicionar status.");
    }
    return response.json();
}

export async function updateStatus(idStatus: number, nomeStatus: string, hexCorPrimaria: string, hexCorSecundaria: string): Promise<IStatus> {
    const response = await fetch(`${API_BASE_URL}/statuses/${idStatus}`, {
        method: "PUT",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            idStatus,
            nomeStatus,
            hexCorPrimaria,
            hexCorSecundaria
        }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao atualizar status.");
    }
    return response.json();
}

export async function deleteStatus(idStatus: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/statuses/${idStatus}`, {
        method: "DELETE",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idStatus }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao excluir o status.");
    }
}
