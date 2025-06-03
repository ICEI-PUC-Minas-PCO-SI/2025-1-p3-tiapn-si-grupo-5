import type { Status } from "@/interfaces/InterfaceStatus";

export async function getAllStatus(): Promise<Status[]> {
    try {
        const response = await fetch("http://localhost:3000/status");
        if (!response.ok) {
            throw new Error("Erro ao buscar status");
        }
        const managements = await response.json();
        return managements;
    } catch (error) {
        console.error("Erro ao buscar status", error);
        throw error;
    }
}
