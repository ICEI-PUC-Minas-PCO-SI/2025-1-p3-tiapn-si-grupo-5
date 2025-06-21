import { API_BASE_URL } from "@/api/config";

export interface ILoginUserPayload {
    email: string;
    senha: string;
}

export interface IRegisterUserPayload {
    nomeUsuario: string;
    matricula: string;
    ramal: string;
    email: string;
    senha: string;
    gerencia: number;
    tipoUsuario: number;
}

export async function registerNewUser(payload: IRegisterUserPayload): Promise<Response> {
    return fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
}

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

export async function getMe(): Promise<IMeResponse | null> {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
        credentials: 'include'
    });
    if (!response.ok) return null;
    return response.json();
}

export async function loginUser(payload: ILoginUserPayload): Promise<Response> {
    return fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(payload),
    });
}

export async function requestPasswordReset(email: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/auth/request-password-reset`, {
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
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, senha }),
    });
    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.error || "Erro ao redefinir senha");
    }
}

export async function logoutApi(): Promise<void> {
    await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
    });
}
