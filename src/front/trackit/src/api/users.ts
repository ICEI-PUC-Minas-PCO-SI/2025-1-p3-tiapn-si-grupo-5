import type { InterfaceGetUser } from "../interfaces/InterfaceGetUser";
import type { User } from "../interfaces/InterfacesDataTableUsers";

export async function getAllUsers(): Promise<User[]> {
    try {
        const response = await fetch("http://localhost:3000/usuarios");
        if (!response.ok) {
            throw new Error("Erro ao buscar usuários");
        }
        const users: InterfaceGetUser[] = await response.json();
        return users.map((user) => ({
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
                nomeGerencia: user.nomeGerencia,
            },
            ativo: user.ativo,
        }));
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        throw error;
    }
}
