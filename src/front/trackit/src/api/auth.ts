import { API_BASE_URL } from "@/api/config";

export interface IMeResponse {
    usuario: {
        id: number;
        nome: string;
        email: string;
        ramal?: string;
        matricula?: string;
        gerencia?: number | null;
        tipo?: number | null;
        ativo: number;
        fotoPerfil?: string | null;
        idTipoUsuario?: number | null;
        nomeGerencia?: string;
    } | null;
}

export async function getMe(token: string): Promise<IMeResponse | null> {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) return null;
    return response.json();
}
