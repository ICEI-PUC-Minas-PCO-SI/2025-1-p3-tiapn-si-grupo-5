import type { UserType } from "../interfaces/InterfaceUserTypes";

export async function getAllUserTypes(): Promise<UserType[]> {
    try {
        const response = await fetch("http://localhost:3000/tipos-usuarios");
        if (!response.ok) {
            throw new Error("Erro ao buscar tipos de usuário");
        }
        const userTypes = await response.json();
        console.log("Dados recebidos do backend (tipos de usuário):", userTypes);
        return userTypes;
    } catch (error) {
        console.error("Erro ao buscar tipos de usuário:", error);
        throw error;
    }
}
