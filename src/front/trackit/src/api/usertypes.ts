import { API_BASE_URL } from "@/api/config";

export interface UserType {
    idTipoUsuario: number;
    tipoUsuario: string;
}

export async function getAllUserTypes(): Promise<UserType[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/user-types`);
        if (!response.ok) {
            throw new Error("Erro ao buscar tipos de usuário");
        }
        const userTypes = await response.json();
        return userTypes;
    } catch (error) {
        console.error("Erro ao buscar tipos de usuário:", error);
        throw error;
    }
}
