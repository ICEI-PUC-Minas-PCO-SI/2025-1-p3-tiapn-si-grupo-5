import type { InterfaceGetUser } from "../interfaces/InterfaceGetUser";
import type { User } from "../interfaces/InterfacesDataTableUsers";
import { getAllActiveManagements } from "./management";
import type { RegisterUserPayload } from "../interfaces/InterfaceRegisterUser";

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
        const managements = await getAllActiveManagements()
        return users.map((user) => {
            const matchedManagement = managements.find(
                (management) => management.idGerencia === user.idGerencia
            );

            return {
                id: user.idUsuario.toString(),
                name: user.nomeUsuario,
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
