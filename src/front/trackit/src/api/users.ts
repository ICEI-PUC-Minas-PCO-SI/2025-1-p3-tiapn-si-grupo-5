import type { InterfaceGetUser } from "../interfaces/InterfaceGetUser";
import type { User } from "../interfaces/InterfacesDataTableUsers";
import { getAllActiveManagements } from "./management";
import type { RegisterUserPayload } from "../interfaces/InterfaceRegisterUser";
import type { UpdateUser } from "../interfaces/InterfaceUpdateUser";

export async function registerNewUser(payload: RegisterUserPayload): Promise<Response> {
    return fetch("http://localhost:3000/usuarios/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
}

export async function getAllUsers(): Promise<User[]> {
    try {
        const response = await fetch("http://localhost:3000/usuarios");
        if (!response.ok) {
            throw new Error("Erro ao buscar usuários");
        }
        const users: InterfaceGetUser[] = await response.json();
        const managements = await getAllActiveManagements();
        return users.map((user) => {
            const matchedManagement = managements.find(
                (management) => management.idGerencia === user.idGerencia
            );

            return {
                id: user.idUsuario.toString(),
                name: user.nomeUsuario,
                matricula: user.matricula,
                accessType:
                    user.idTipoUsuario === 1
                        ? "Gestor"
                        : user.idTipoUsuario === 2
                            ? "Analista"
                            : "Usuário",
                management: {
                    idGerencia: user.idGerencia,
                    nomeGerencia: matchedManagement?.nomeGerencia || "Não informado",
                },
                ativo: user.ativo,
            };
        });
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        throw error;
    }
}

export async function updateUser(payload: UpdateUser): Promise<Response> {
    return fetch(`http://localhost:3000/usuarios/${payload.idUsuario}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            matricula: payload.matricula,
            gerencia: payload.gerencia,
            tipoUsuario: payload.tipoUsuario,
        }),
    });
}

export async function updateUserStatus(idUsuario: string, ativo: number): Promise<Response> {
    return fetch(`http://localhost:3000/usuarios/${idUsuario}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ativo }),
    });
}
