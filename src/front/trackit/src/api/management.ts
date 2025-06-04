import type { Gerencia } from "../interfaces/InterfaceManagement";

export async function getAllActiveManagements(): Promise<Gerencia[]> {
    try {
        const response = await fetch("http://localhost:3000/department");
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
