import type { Management } from "../interfaces/InterfaceManagement";

export async function getAllActiveManagements(): Promise<Management[]> {
    try {
        const response = await fetch("http://localhost:3000/gerencias/active");
        if (!response.ok) {
            throw new Error("Erro ao buscar gerências ativas");
        }
        const managements = await response.json();
        console.log("Dados recebidos do backend (gerências):", managements);
        return managements;
    } catch (error) {
        console.error("Erro ao buscar gerências ativas:", error);
        throw error;
    }
}
