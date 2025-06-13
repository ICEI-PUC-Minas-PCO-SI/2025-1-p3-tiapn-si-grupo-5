import { API_BASE_URL } from "@/api/config";

export interface IMeResponse {
    usuario: {
        idUsuario: number;
        nomeUsuario: string;
        email: string;
        ramal?: string;
        matricula?: string;
        idGerencia?: number | null;
        idTipoUsuario?: number | null;
        ativo: number;
        fotoPerfil?: string | null;
        gerencia?: {
            nomeGerencia: string;
        } | null;
    } | null;
}

export async function getMe(token: string): Promise<IMeResponse | null> {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) return null;
    return response.json();
}
