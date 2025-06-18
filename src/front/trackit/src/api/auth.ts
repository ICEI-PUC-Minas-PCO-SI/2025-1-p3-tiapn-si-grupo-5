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

export async function requestPasswordReset(email: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/users/request-password-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });
    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.error || "Erro ao solicitar redefinição de senha");
    }
}

export async function resetPassword(token: string, senha: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/users/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, senha }),
    });
    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.error || "Erro ao redefinir senha");
    }
}
