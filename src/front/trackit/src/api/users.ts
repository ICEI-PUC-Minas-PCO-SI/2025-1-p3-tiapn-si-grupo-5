import { getAllActiveManagements } from "@/api/management";
import { API_BASE_URL } from "@/api/config";
import { authHeaders } from "@/contexts/helperCookies";

export interface IUpdateProfileUserPayload {
    nome: string;
    email: string;
    ramal: string;
}

export interface IUserListItem {
    id: string;
    name: string;
    matricula: string;
    accessType: "Gestor" | "Analista" | "Usuário";
    management: {
        idGerencia: number;
        nomeGerencia: string;
    };
    ativo: number;
}

export interface ILoginUserPayload {
    email: string;
    senha: string;
}

export interface IUpdateUser {
    idUsuario: number;
    nomeUsuario: string;
    email: string;
    ramal: string;
    matricula?: string;
    gerencia?: number;
    tipoUsuario?: number;
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

export interface IGetUser {
    idUsuario: number;
    nomeUsuario: string;
    matricula: string;
    idTipoUsuario?: number;
    idGerencia: number;
    nomeGerencia: string;
    ativo: number;
}

export interface IAnalyst {
    idUsuario: number;
    nomeUsuario: string;
    matricula: string;
    idTipoUsuario: number;
    idGerencia: number;
    ativo: number;
    email: string;
    ramal: string;
    dataCadastro: string;
}

export async function registerNewUser(payload: IRegisterUserPayload): Promise<Response> {
    return fetch(`${API_BASE_URL}/users/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
}

export async function getAllUsers(): Promise<IUserListItem[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            headers: authHeaders()
        });
        if (!response.ok) {
            throw new Error("Erro ao buscar usuários");
        }
        const users: IGetUser[] = await response.json();
        const managements = await getAllActiveManagements();
        return users.map((user) => {
            const matchedManagement = managements.find(
                (management) => management.idGerencia === user.idGerencia
            );
            let accessType: "Gestor" | "Analista" | "Usuário";
            if (user.idTipoUsuario === 1) accessType = "Gestor";
            else if (user.idTipoUsuario === 2) accessType = "Analista";
            else accessType = "Usuário";
            const mapped: IUserListItem = {
                id: user.idUsuario.toString(),
                name: user.nomeUsuario,
                matricula: user.matricula,
                accessType,
                management: {
                    idGerencia: user.idGerencia,
                    nomeGerencia: matchedManagement?.nomeGerencia || "Não informado",
                },
                ativo: user.ativo,
            };
            return mapped;
        });
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        throw error;
    }
}

export async function updateUser(payload: IUpdateUser): Promise<Response> {
    return fetch(`${API_BASE_URL}/users/${payload.idUsuario}`, {
        method: "PUT",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({
            matricula: payload.matricula,
            gerencia: payload.gerencia,
            tipoUsuario: payload.tipoUsuario,
        }),
    });
}

export async function updateUserStatus(idUsuario: string, ativo: number): Promise<Response> {
    return fetch(`${API_BASE_URL}/users/${idUsuario}/status`, {
        method: "PATCH",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ ativo }),
    });
}

export async function loginUser(payload: ILoginUserPayload): Promise<Response> {
    return fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
}

export async function updateProfileUser(
    userId: number,
    payload: IUpdateProfileUserPayload
): Promise<Response> {
    return fetch(`${API_BASE_URL}/users/profile/${userId}`, {
        method: "PUT",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify(payload),
    });
}

export async function getAllAnalysts(): Promise<IAnalyst[]> {
    const response = await fetch(`${API_BASE_URL}/users/analysts`);
    if (!response.ok) throw new Error("Erro ao buscar analistas");
    return response.json();
}
