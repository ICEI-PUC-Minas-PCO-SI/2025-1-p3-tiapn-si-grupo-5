import { API_BASE_URL } from "@/api/config";
import { authHeaders } from "@/contexts/helperCookies";

export interface IManagement {
    idGerencia: number;
    nomeGerencia: string;
    ativo: number;
}

export async function getAllActiveManagements(): Promise<IManagement[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/departments`, {
            headers: authHeaders()
        });
        if (!response.ok) {
            throw new Error("Erro ao buscar gerências ativas");
        }
        const managements = await response.json();
        return managements;
    } catch (error) {
        console.error("Erro ao buscar gerências ativas:", error);
        throw error;
    }
}

export async function getAllActiveManagementsPublic(): Promise<IManagement[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/departments/public`);
        if (!response.ok) {
            throw new Error("Erro ao buscar gerências ativas (público)");
        }
        const managements = await response.json();
        return managements;
    } catch (error) {
        console.error("Erro ao buscar gerências ativas (público):", error);
        throw error;
    }
}

export async function addManagement(nomeGerencia: string): Promise<IManagement> {
    const response = await fetch(`${API_BASE_URL}/departments`, {
        method: "POST",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ nomeGerencia }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao adicionar gerência.");
    }
    return response.json();
}

export async function updateManagement(idGerencia: number, nomeGerencia: string): Promise<IManagement> {
    const response = await fetch(`${API_BASE_URL}/departments/${idGerencia}`, {
        method: "PUT",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({
            idGerencia,
            nomeGerencia
        }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao atualizar gerência.");
    }
    return response.json();
}

export async function deleteManagement(idGerencia: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/departments/${idGerencia}`, {
        method: "DELETE",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ idGerencia }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao excluir a gerência.");
    }
}
