import type { ApiUser } from "@/interfaces/ApiUser";

export async function getAllUsers(): Promise<ApiUser[]> {
    try {
        const response = await fetch("http://localhost:3000/usuarios");
        if (!response.ok) {
            throw new Error("Erro ao buscar usuários");
        }
        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        throw error;
    }
}
